import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';
import Unsplash from '~/lib/unsplash';

import config from '~/app/diegocosta.me/config';

const content = contentFor(config);
const unsplash = Unsplash(config.unsplash);

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { domain } = config;

  const pages = content.getPages();

  const [photos, collections, collectionPhotos] = await Promise.all([
    unsplash.getAllPhotos(),
    unsplash.getCollections(),
    unsplash.getAllCollectionPhotoParams(),
  ]);

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...pages.map(({ slug }) => ({
      url: `https://${domain}/${slug}`,
      priority: 0.8,
    })),
    {
      url: `https://${domain}/about`,
      priority: 0.5,
    },
    {
      url: `https://${domain}/contact`,
      priority: 0.3,
    },
    ...photos.map((photo) => ({
      url: `https://${domain}/p/${photo.id}`,
      priority: 0.5,
    })),
    {
      url: `https://${domain}/collections`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...collections.map((collection) => ({
      url: `https://${domain}/collections/${collection.id}`,
      priority: 0.6,
    })),
    ...collectionPhotos.map(({ id, photo }) => ({
      url: `https://${domain}/collections/${id}/${photo}`,
      priority: 0.4,
    })),
  ];
}
