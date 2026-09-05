import type { MetadataRoute } from 'next';

import config from '~/app/diegocoxta.com/config';

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain, locales } = config;

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...locales.map((locale) => ({
      url: `https://${domain}/${locale}`,
      priority: 0.8,
    })),
  ];
}
