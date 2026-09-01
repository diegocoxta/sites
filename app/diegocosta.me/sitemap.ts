import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocosta.me/config';

const content = contentFor(config);

export const revalidate = 76800;

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain } = config;

  const pages = content.getPages();

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
