'use server';

import { getCollectionPhotos, getPhoto, getRecentUserPhotos, getUserCollections } from '~/lib/services/unsplash';

import type {
  CollectionDetail,
  CollectionSummary,
  Gallery,
  Photo,
  PhotoContext,
  PhotoDetails,
} from '~/components/PhotoShowcase/types';

import config from '~/app/diegocosta.me/config';

/**
 * The controller between the Unsplash HTTP layer (`~/lib/services/unsplash`, a thin fetch)
 * and the shapes the PhotoShowcase components speak. Pagination, catalog-walking, prev/next
 * context and the source→component mapping all live here — swap the source by rewriting
 * this file; the service stays dumb and the components never change. Every export is a
 * server action so the client Feed and Lightbox can call it directly.
 */

/**
 * Chunk size for infinite scroll, and the page size used to walk the whole catalog
 * (static params, prev/next context). Unsplash caps `per_page` at 30; using the same size
 * for both means the walk's cached fetches ARE the pagination responses the client asks
 * for later — no extra API calls.
 */
const PAGE_SIZE = 30;
/** Safety cap so a misbehaving API can never loop forever. */
const MAX_PAGES = 20;

/** The photo host this file reads from — the only spot that names it. */
const SOURCE_NAME = 'Unsplash';

const { username, authorization } = config.unsplash;
const creds = username && authorization ? { username, authorization } : null;

type SourcePhoto = NonNullable<Awaited<ReturnType<typeof getRecentUserPhotos>>>[number];
type SourceCollection = NonNullable<Awaited<ReturnType<typeof getUserCollections>>>[number];

function toPhoto(photo: SourcePhoto): Photo {
  return {
    id: photo.id,
    src: photo.urls.regular,
    alt: photo.alt_description ?? '',
    width: photo.width,
    height: photo.height,
    placeholderColor: photo.color,
    source: { name: SOURCE_NAME, url: photo.links.html },
  };
}

function toCollectionSummary(collection: SourceCollection): CollectionSummary {
  return {
    id: collection.id,
    title: collection.title,
    photoCount: collection.total_photos,
    coverSrc: collection.cover_photo?.urls.regular ?? collection.preview_photos[0]?.urls.regular ?? null,
  };
}

function toGallery(photos: SourcePhoto[] | null): Gallery {
  if (photos === null) {
    // upstream failed (rate limit, network) — the list did NOT end
    return { photos: [], hasMore: true, ok: false };
  }

  return { photos: photos.map(toPhoto), hasMore: photos.length === PAGE_SIZE, ok: true };
}

function fetchUserPhotos(page: number): Promise<SourcePhoto[] | null> {
  return creds ? getRecentUserPhotos({ ...creds, per_page: PAGE_SIZE, page }) : Promise.resolve([]);
}

function fetchCollectionPhotos(id: string, page: number): Promise<SourcePhoto[] | null> {
  return creds
    ? getCollectionPhotos({ id, authorization: creds.authorization, per_page: PAGE_SIZE, page })
    : Promise.resolve([]);
}

async function walk(fetchPage: (page: number) => Promise<SourcePhoto[] | null>): Promise<SourcePhoto[]> {
  const all: SourcePhoto[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const photos = await fetchPage(page);

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

function contextAt(photos: Photo[], id: string): PhotoContext | null {
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

export async function getPhotosPage(page: number): Promise<Gallery> {
  return toGallery(await fetchUserPhotos(page));
}

export async function getCollectionPhotosPage(id: string, page: number): Promise<Gallery> {
  return toGallery(await fetchCollectionPhotos(id, page));
}

export async function getAllPhotos(): Promise<Photo[]> {
  return (await walk(fetchUserPhotos)).map(toPhoto);
}

export async function getPhotoContext(id: string): Promise<PhotoContext | null> {
  return contextAt(await getAllPhotos(), id);
}

export async function getCollections(): Promise<CollectionSummary[]> {
  if (!creds) {
    return [];
  }

  const collections = await getUserCollections({ ...creds, per_page: PAGE_SIZE });

  return (collections ?? []).map(toCollectionSummary);
}

export async function getCollection(id: string): Promise<CollectionDetail | null> {
  if (!creds) {
    return null;
  }

  const collections = await getUserCollections({ ...creds, per_page: PAGE_SIZE });
  const collection = (collections ?? []).find((entry) => entry.id === id);

  if (!collection) {
    return null;
  }

  return {
    ...toCollectionSummary(collection),
    description: collection.description ?? null,
    publishedAt: collection.published_at,
  };
}

export async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
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
    exif: photo.exif && {
      camera,
      aperture: photo.exif.aperture,
      focalLength: photo.exif.focal_length,
      iso: photo.exif.iso,
      shutterSpeed: photo.exif.exposure_time,
    },
    location: photo.location && {
      name: photo.location.name,
      city: photo.location.city,
      country: photo.location.country,
      latitude: photo.location.position?.latitude ?? null,
      longitude: photo.location.position?.longitude ?? null,
    },
  };
}
