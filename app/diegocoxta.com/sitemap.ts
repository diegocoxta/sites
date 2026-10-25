import type { MetadataRoute } from 'next';

import { localizedSitemapEntries } from '~/lib/i18n';

import config from '~/app/diegocoxta.com/config';

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedSitemapEntries(config, '', { lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 });
}
