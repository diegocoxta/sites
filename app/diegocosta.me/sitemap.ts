import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollections } from '~/app/diegocosta.me/actions';

const content = contentFor(config);

export const revalidate = 86400;

type SitemapEntry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { domain, locales } = config;

  const pages = content.getPages(locales[0]);

  const [photos, collections] = await Promise.all([getAllPhotos(), getCollections()]);

  const localized = (path: string, entry: Omit<SitemapEntry, 'url' | 'alternates'>): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: `https://${domain}/${locale}${path}`,
      ...entry,
      alternates: {
        languages: Object.fromEntries(
          locales.map((entryLocale) => [entryLocale, `https://${domain}/${entryLocale}${path}`])
        ),
      },
    }));

  return [
    ...localized('', { lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 }),
    ...pages.flatMap(({ slug }) => localized(`/${slug}`, { priority: 0.8 })),
    ...photos.flatMap((photo) => localized(`/p/${photo.id}`, { priority: 0.5 })),
    ...collections.flatMap((collection) => localized(`/c/${collection.id}`, { priority: 0.6 })),
  ];
}
