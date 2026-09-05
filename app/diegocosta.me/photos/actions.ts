'use server';

import Unsplash, { type PhotoDetails, type PhotoPage } from '~/lib/unsplash';

import config from '~/app/diegocosta.me/config';

const unsplash = Unsplash(config.unsplash);

export async function loadMorePhotos(page: number): Promise<PhotoPage> {
  return unsplash.getPhotosPage(page);
}

// Exif isn't scoped to a collection, so this also serves the collection photo pages.
export async function getPhotoDetails(id: string): Promise<PhotoDetails | null> {
  return unsplash.getPhotoDetails(id);
}
