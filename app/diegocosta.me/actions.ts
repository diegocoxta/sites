'use server';

import {
  getCollectionPhotos,
  getPhoto,
  getRecentUserPhotos,
  getUserCollections,
  type UnsplashCollection,
  type UnsplashPhoto,
  type UnsplashPhotoDetails,
} from '~/lib/services/unsplash';

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

/** Chunk size for infinite scroll and for the catalog walks. Unsplash caps per_page at 30. */
const PAGE_SIZE = 30;
/** Safety cap so a misbehaving API can never loop forever (30 × 20 = 600 items). */
const MAX_PAGES = 20;

/** The photo host this file reads from — the only spot that names it. */
const SOURCE_NAME = 'Unsplash';

const { username, authorization } = config.unsplash;

if (!username || !authorization) {
  throw new Error('diegocosta.me: UNSPLASH_USERNAME and UNSPLASH_ACCESS_KEY must be set');
}

const creds = { username, authorization };

// --- mappers: source shape → the vocabulary PhotoShowcase speaks ---------------

function toPhoto(photo: UnsplashPhoto): Photo {
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

/** Wrap a fetched page of photos; `null` means the upstream call failed, not "list ended". */
function toGallery(photos: UnsplashPhoto[] | null): Gallery {
  if (photos === null) {
    return { photos: [], hasMore: true, ok: false };
  }

  return { photos: photos.map(toPhoto), hasMore: photos.length === PAGE_SIZE, ok: true };
}

function toCollectionSummary(collection: UnsplashCollection): CollectionSummary {
  return {
    id: collection.id,
    title: collection.title,
    photoCount: collection.total_photos,
    coverSrc: collection.cover_photo?.urls.regular ?? collection.preview_photos[0]?.urls.regular ?? null,
  };
}

function toCollectionDetail(collection: UnsplashCollection): CollectionDetail {
  return {
    ...toCollectionSummary(collection),
    description: collection.description ?? null,
    publishedAt: collection.published_at,
  };
}

function toPhotoDetails(photo: UnsplashPhotoDetails): PhotoDetails {
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

// --- fetch one page ----------------------------------------------------------------

function fetchUserPhotos(page: number): Promise<UnsplashPhoto[] | null> {
  return getRecentUserPhotos({ ...creds, per_page: PAGE_SIZE, page });
}

function fetchCollectionPhotos(id: string, page: number): Promise<UnsplashPhoto[] | null> {
  return getCollectionPhotos({ id, authorization: creds.authorization, per_page: PAGE_SIZE, page });
}

// --- walk every page -------------------------------------------------------------

async function allUserPhotos(): Promise<UnsplashPhoto[]> {
  const all: UnsplashPhoto[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const photos = await fetchUserPhotos(page);

    if (!photos?.length) {
      break;
    }

    all.push(...photos);

    if (photos.length < PAGE_SIZE) {
      break;
    }
  }

  return all;
}

async function allCollections(): Promise<UnsplashCollection[]> {
  const all: UnsplashCollection[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const collections = await getUserCollections({ ...creds, per_page: PAGE_SIZE, page });

    if (!collections?.length) {
      break;
    }

    all.push(...collections);

    if (collections.length < PAGE_SIZE) {
      break;
    }
  }

  return all;
}

/** Neighbours of `id` in an ordered photo list, for the lightbox's ‹ › and "n / total". */
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

// --- server actions: fetch → map -----------------------------------------------

export async function getPhotosPage(page: number): Promise<Gallery> {
  return toGallery(await fetchUserPhotos(page));
}

export async function getCollectionPhotosPage(id: string, page: number): Promise<Gallery> {
  return toGallery(await fetchCollectionPhotos(id, page));
}

export async function getAllPhotos(): Promise<Photo[]> {
  return (await allUserPhotos()).map(toPhoto);
}

export async function getPhotoContext(id: string): Promise<PhotoContext | null> {
  return contextAt(await getAllPhotos(), id);
}

export async function getCollections(): Promise<CollectionSummary[]> {
  return (await allCollections()).map(toCollectionSummary);
}

export async function getCollection(id: string): Promise<CollectionDetail | null> {
  const collection = (await allCollections()).find((entry) => entry.id === id);

  return collection ? toCollectionDetail(collection) : null;
}

export async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
  const photo = await getPhoto({ id, authorization: creds.authorization });

  return photo ? toPhotoDetails(photo) : null;
}
