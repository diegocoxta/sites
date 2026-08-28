import type { MetadataRoute } from 'next';

import { SUPPORTED_LANGUAGES } from '~/lib/lang';

import config from '~/app/diegocoxta.com/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain } = config;

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...SUPPORTED_LANGUAGES.map((lang) => ({
      url: `https://${domain}/${lang}`,
      priority: 0.8,
    })),
  ];
}
