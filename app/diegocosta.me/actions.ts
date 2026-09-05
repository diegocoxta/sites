'use server';

import Unsplash from '~/lib/unsplash';

import type { CollectionSummary, Gallery, PhotoDetails } from '~/components/PhotographyPortfolio/types';

import config from '~/app/diegocosta.me/config';

import { toCollectionSummary, toGalleryPage, toPhotoDetails } from './portfolio';

const unsplash = Unsplash(config.unsplash);

export async function getPhotosPage(page: number): Promise<Gallery> {
  return toGalleryPage(await unsplash.getPhotosPage(page));
}

export async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
  const details = await unsplash.getPhotoDetails(id);
  return details && toPhotoDetails(details);
}

export async function getCollections(): Promise<CollectionSummary[]> {
  return (await unsplash.getCollections()).map(toCollectionSummary);
}

export async function getCollectionPhotosPage(id: string, page: number): Promise<Gallery> {
  return toGalleryPage(await unsplash.getCollectionPhotosPage(id, page));
}
