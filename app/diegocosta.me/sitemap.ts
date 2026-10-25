import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';
import { localizedSitemapEntries } from '~/lib/i18n';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollections } from '~/app/diegocosta.me/actions';

const content = contentFor(config);

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = content.getPages(config.locales[0]);

  const [photos, collections] = await Promise.all([getAllPhotos(), getCollections()]);

  return [
    ...localizedSitemapEntries(config, '', { lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 }),
    ...pages.flatMap(({ slug }) => localizedSitemapEntries(config, `/${slug}`, { priority: 0.8 })),
    ...photos.flatMap((photo) => localizedSitemapEntries(config, `/p/${photo.id}`, { priority: 0.5 })),
    ...collections.flatMap((collection) => localizedSitemapEntries(config, `/c/${collection.id}`, { priority: 0.6 })),
  ];
}
