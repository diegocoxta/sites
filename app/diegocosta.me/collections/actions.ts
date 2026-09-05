'use server';

import Unsplash, { type PhotoPage } from '~/lib/unsplash';

import config from '~/app/diegocosta.me/config';

const unsplash = Unsplash(config.unsplash);

export async function loadMoreCollectionPhotos(id: string, page: number): Promise<PhotoPage> {
  return unsplash.getCollectionPhotosPage(id, page);
}
