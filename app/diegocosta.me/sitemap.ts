import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollections } from '~/app/diegocosta.me/actions';

const content = contentFor(config);

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { domain } = config;

  const pages = content.getPages();

  const [photos, collections] = await Promise.all([getAllPhotos(), getCollections()]);

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
    ...photos.map((photo) => ({
      url: `https://${domain}/p/${photo.id}`,
      priority: 0.5,
    })),
    ...collections.map((collection) => ({
      url: `https://${domain}/c/${collection.id}`,
      priority: 0.6,
    })),
  ];
}
