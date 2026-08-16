import { MetadataRoute } from 'next';

import { getPages, getPosts, getTags } from '~/lib/mdcms';

import config from '~/app/diegocosta.com.br/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${config.domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `https://${config.domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...getPages(config.domain).map(({ slug }) => ({
      url: `https://${config.domain}/${slug}`,
      priority: 0.8,
    })),
    ...getTags(config.domain).map((tag) => ({
      url: `https://${config.domain}/blog/tag/${tag}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
    ...getPosts(config.domain).map(({ slug }) => ({
      url: `https://${config.domain}/blog/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
