'use server';

import { cache } from 'react';

import { getCollectionPhotos, getPhoto, getRecentUserPhotos, getUserCollections } from '~/lib/services/unsplash';
import type { UnsplashCollection, UnsplashPhoto, UnsplashPhotoDetails } from '~/lib/services/unsplash';

import type { Collection, Photo, PhotoContext, PhotoDetails, PhotoFeedPage } from '~/components/PhotoShowcase/types';

import config from '~/app/diegocosta.me/config';

/** Chunk size for infinite scroll and for the catalog walks. Unsplash caps per_page at 30. */
const PAGE_SIZE = 30;
/** Safety cap so a misbehaving API can never loop forever (30 × 20 = 600 items). */
const MAX_PAGES = 20;

const SOURCE_NAME = 'Unsplash';
const SOURCE_URL = 'https://unsplash.com';
const VALID_ID = /^[\w-]{1,64}$/;

const { username, authorization } = config.unsplash;

if (!username || !authorization) {
  throw new Error('diegocosta.me: UNSPLASH_USERNAME and UNSPLASH_ACCESS_KEY must be set');
}

const creds = { username, authorization };

function toPhoto(photo: UnsplashPhoto): Photo {
  return {
    id: photo.id,
    src: photo.urls.regular,
    thumbnailSrc: photo.urls.small,
    alt: photo.alt_description?.trim() ?? '',
    width: photo.width,
    height: photo.height,
    placeholderColor: photo.color,
    source: {
      name: SOURCE_NAME,
      url: SOURCE_URL,
      author: photo.user.name,
      authorUrl: photo.user.links.html,
    },
  };
}

function toPhotoFeedPage(photos: UnsplashPhoto[] | null): PhotoFeedPage {
  if (photos === null) {
    return { photos: [], hasMore: true, ok: false };
  }

  return { photos: photos.map(toPhoto), hasMore: photos.length === PAGE_SIZE, ok: true };
}

function toCollection(collection: UnsplashCollection): Collection {
  return {
    id: collection.id,
    title: collection.title,
    photoCount: collection.total_photos,
    coverSrc: collection.cover_photo?.urls.regular ?? collection.preview_photos[0]?.urls.regular ?? null,
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

function fetchUserPhotos(page: number): Promise<UnsplashPhoto[] | null> {
  return getRecentUserPhotos({ ...creds, per_page: PAGE_SIZE, page });
}

function fetchCollectionPhotos(id: string, page: number): Promise<UnsplashPhoto[] | null> {
  return getCollectionPhotos({ id, authorization: creds.authorization, per_page: PAGE_SIZE, page });
}

const allUserPhotos = cache(async (): Promise<UnsplashPhoto[]> => {
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
});

const allCollections = cache(async (): Promise<UnsplashCollection[]> => {
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
});

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

export async function getPhotosPage(page: number): Promise<PhotoFeedPage> {
  return toPhotoFeedPage(await fetchUserPhotos(page));
}

export async function getCollectionPhotosPage(id: string, page: number): Promise<PhotoFeedPage> {
  if (!VALID_ID.test(id)) {
    return toPhotoFeedPage([]);
  }

  return toPhotoFeedPage(await fetchCollectionPhotos(id, page));
}

export async function getAllPhotos(): Promise<Photo[]> {
  return (await allUserPhotos()).map(toPhoto);
}

export async function getPhotoContext(id: string): Promise<PhotoContext | null> {
  return VALID_ID.test(id) ? contextAt(await getAllPhotos(), id) : null;
}

export async function getCollections(): Promise<Collection[]> {
  return (await allCollections()).map(toCollection);
}

export async function getCollection(id: string): Promise<Collection | null> {
  if (!VALID_ID.test(id)) {
    return null;
  }

  const collection = (await allCollections()).find((entry) => entry.id === id);

  return collection ? toCollection(collection) : null;
}

export async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
  if (!VALID_ID.test(id)) {
    return null;
  }

  const photo = await getPhoto({ id, authorization: creds.authorization });

  return photo ? toPhotoDetails(photo) : null;
}
