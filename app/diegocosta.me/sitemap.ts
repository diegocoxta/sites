import type { MetadataRoute } from 'next';

import { getPages } from '~/lib/md';

import config from '~/app/diegocosta.me/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain } = config;

  const pages = getPages(domain);

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
  ];
}
