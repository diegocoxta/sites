import { MetadataRoute } from 'next';

import { getPages } from '~/lib/mdcms';

import config from '~/app/diegocoxta.com/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${config.domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...getPages(config.domain).map(({ slug }) => ({
      url: `https://${config.domain}/${slug}`,
      priority: 0.8,
    })),
  ];
}
