import 'server-only';

import { getCollectionPhotos, getPhoto, getRecentUserPhotos, getUserCollections } from '~/lib/services/unsplash';

/**
 * Pagination, catalog-walking and prev/next context for an Unsplash user's photos and
 * collections — the shared logic behind the gallery, its infinite scroll and its modal.
 * Domain-agnostic: `Unsplash(config.unsplash)` binds a site's own credentials once, so
 * any site in this repo can reuse it — see `app/diegocosta.me/photos/page.tsx`.
 */

/**
 * Chunk size for infinite scroll, and also the page size used to walk a whole
 * catalog (context, static params). Unsplash caps per_page at 30. Keeping both
 * uses the same size means the catalog walk's cached fetches ARE the exact
 * pagination responses infinite scroll will request later — no extra API calls.
 */
const PAGE_SIZE = 30;
/** Safety cap so a misbehaving API can never loop forever. */
const MAX_PAGES = 20;

export type Photo = {
  id: string;
  created_at: string;
  alt_description: string | null;
  width: number;
  height: number;
  /** Dominant color, used as a placeholder background while the real image loads. */
  color: string | null;
  likes: number;
  urls: {
    regular: string;
    /** Unsplash's largest non-original variant — used for the lightbox, where `regular`
     * (capped at 1080px wide) isn't enough to fill a large modal on bigger screens. */
    full: string;
  };
  links: {
    html: string;
  };
};

export type PhotoPage = {
  photos: Photo[];
  hasMore: boolean;
  /** false when the upstream request failed (rate limit, network) — the list did NOT end. */
  ok: boolean;
};

export type PhotoContext = {
  photo: Photo;
  prevId: string | null;
  nextId: string | null;
  index: number;
  total: number;
};

export type Collection = {
  id: string;
  title: string;
  description: string | null;
  totalPhotos: number;
  coverUrl: string | null;
  publishedAt: string;
};

export type Stats = {
  totalPhotos: number;
  totalCollections: number;
  /** Years between the earliest photo's capture date and now — for the About page. */
  yearsActive: number;
};

export type CollectionPhotoParams = { id: string; photo: string };

export type PhotoDetails = {
  description: string | null;
  exif: {
    camera: string | null;
    aperture: string | null;
    focalLength: string | null;
    iso: number | null;
    exposureTime: string | null;
  } | null;
  location: {
    name: string | null;
    city: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
  } | null;
};

export type UnsplashCredentials = {
  username?: string;
  authorization?: string;
};

function contextFor(photos: Photo[], id: string): PhotoContext | null {
  const index = photos.findIndex((photo) => photo.id === id);

  if (index === -1) {
    return null;
  }

  return {
    photo: photos[index],
    prevId: index > 0 ? photos[index - 1].id : null,
    nextId: index < photos.length - 1 ? photos[index + 1].id : null,
    index,
    total: photos.length,
  };
}

export default function Unsplash(credentials: UnsplashCredentials) {
  const { username, authorization } = credentials;
  const creds = username && authorization ? { username, authorization } : null;

  async function fetchUserPhotos(page: number): Promise<Photo[] | null> {
    if (!creds) {
      return [];
    }

    return getRecentUserPhotos({ ...creds, per_page: PAGE_SIZE, page });
  }

  async function getPhotosPage(page: number): Promise<PhotoPage> {
    const photos = await fetchUserPhotos(page);

    if (photos === null) {
      return { photos: [], hasMore: true, ok: false };
    }

    return { photos, hasMore: photos.length === PAGE_SIZE, ok: true };
  }

  async function getAllPhotos(): Promise<Photo[]> {
    const all: Photo[] = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const photos = await fetchUserPhotos(page);

      if (photos === null || photos.length === 0) {
        break;
      }

      all.push(...photos);

      if (photos.length < PAGE_SIZE) {
        break;
      }
    }

    return all;
  }

  async function getPhotoContext(id: string): Promise<PhotoContext | null> {
    return contextFor(await getAllPhotos(), id);
  }

  async function getCollections(): Promise<Collection[]> {
    if (!creds) {
      return [];
    }

    const collections = await getUserCollections({ ...creds, per_page: PAGE_SIZE });

    return (collections ?? []).map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description ?? null,
      totalPhotos: collection.total_photos,
      coverUrl: collection.cover_photo?.urls.regular ?? collection.preview_photos[0]?.urls.regular ?? null,
      publishedAt: collection.published_at,
    }));
  }

  async function getCollection(id: string): Promise<Collection | null> {
    // Reuses the cached `getCollections()` list instead of a dedicated request per
    // collection — one fewer Unsplash call per collection at build time.
    const collections = await getCollections();

    return collections.find((collection) => collection.id === id) ?? null;
  }

  async function fetchCollectionPhotos(id: string, page: number): Promise<Photo[] | null> {
    if (!creds) {
      return [];
    }

    return getCollectionPhotos({ id, authorization: creds.authorization, per_page: PAGE_SIZE, page });
  }

  async function getCollectionPhotosPage(id: string, page: number): Promise<PhotoPage> {
    const photos = await fetchCollectionPhotos(id, page);

    if (photos === null) {
      return { photos: [], hasMore: true, ok: false };
    }

    return { photos, hasMore: photos.length === PAGE_SIZE, ok: true };
  }

  async function getAllCollectionPhotos(id: string): Promise<Photo[]> {
    const all: Photo[] = [];

    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const photos = await fetchCollectionPhotos(id, page);

      if (photos === null || photos.length === 0) {
        break;
      }

      all.push(...photos);

      if (photos.length < PAGE_SIZE) {
        break;
      }
    }

    return all;
  }

  async function getCollectionPhotoContext(id: string, photoId: string): Promise<PhotoContext | null> {
    return contextFor(await getAllCollectionPhotos(id), photoId);
  }

  /** Every {collection, photo} pair, for prerendering every collection photo page at build time. */
  async function getAllCollectionPhotoParams(): Promise<CollectionPhotoParams[]> {
    const collections = await getCollections();
    const params: CollectionPhotoParams[] = [];

    for (const collection of collections) {
      const photos = await getAllCollectionPhotos(collection.id);
      params.push(...photos.map((photo) => ({ id: collection.id, photo: photo.id })));
    }

    return params;
  }

  /**
   * Exif/location/full description — only available on the single-photo endpoint, which
   * has no bulk variant. Deliberately NOT walked at build time (would be one request per
   * photo, far past the hourly quota): call this lazily from the client once a photo page
   * has already rendered, and treat `null` as "not available right now" rather than an error.
   */
  async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
    if (!creds) {
      return null;
    }

    const photo = await getPhoto({ id, authorization: creds.authorization });

    if (!photo) {
      return null;
    }

    const camera = [photo.exif?.make, photo.exif?.model].filter(Boolean).join(' ').trim() || null;

    return {
      description: photo.description,
      exif: photo.exif
        ? {
            camera,
            aperture: photo.exif.aperture,
            focalLength: photo.exif.focal_length,
            iso: photo.exif.iso,
            exposureTime: photo.exif.exposure_time,
          }
        : null,
      location: photo.location
        ? {
            name: photo.location.name,
            city: photo.location.city,
            country: photo.location.country,
            latitude: photo.location.position?.latitude ?? null,
            longitude: photo.location.position?.longitude ?? null,
          }
        : null,
    };
  }

  /**
   * Every collection a given photo appears in — derived from the same {collection, photo}
   * pairs `getAllCollectionPhotoParams` already walks (and caches) for the build, so this
   * costs no extra Unsplash requests. (There's no cheaper way to ask "which collections
   * contain this photo": `current_user_collections` on the photo itself only populates for
   * an OAuth-authenticated owner session, not the Client-ID access this app uses.)
   */
  async function getPhotoCollections(photoId: string): Promise<Collection[]> {
    const [collections, pairs] = await Promise.all([getCollections(), getAllCollectionPhotoParams()]);
    const ids = new Set(pairs.filter((pair) => pair.photo === photoId).map((pair) => pair.id));

    return collections.filter((collection) => ids.has(collection.id));
  }

  /**
   * Aggregate counts for the About page — reuses `getAllPhotos`/`getCollections`, both
   * already cached from the build's own walk (sitemap, catalog params), so this adds no
   * extra Unsplash requests.
   */
  async function getStats(): Promise<Stats> {
    const [photos, collections] = await Promise.all([getAllPhotos(), getCollections()]);
    const currentYear = new Date().getFullYear();
    const years = photos.map((photo) => new Date(photo.created_at).getFullYear()).filter((year) => !Number.isNaN(year));
    const earliestYear = years.length > 0 ? Math.min(...years) : currentYear;

    return {
      totalPhotos: photos.length,
      totalCollections: collections.length,
      yearsActive: Math.max(1, currentYear - earliestYear + 1),
    };
  }

  return {
    getPhotosPage,
    getAllPhotos,
    getPhotoContext,
    getCollections,
    getCollection,
    getCollectionPhotosPage,
    getAllCollectionPhotos,
    getCollectionPhotoContext,
    getAllCollectionPhotoParams,
    getPhotoDetails,
    getPhotoCollections,
    getStats,
  };
}

export type UnsplashClient = ReturnType<typeof Unsplash>;
