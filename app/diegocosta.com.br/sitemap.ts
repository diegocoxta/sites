import type { MetadataRoute } from 'next';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain } = config;

  const posts = content.getPosts();
  const pages = content.getPages();
  const tags = content.getTags();

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `https://${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `https://${domain}/blog/feed`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...[...posts, ...pages].map(({ href }) => ({
      url: `https://${domain}${href}`,
      priority: 0.8,
    })),
    ...tags.map((tag) => ({
      url: `https://${domain}/blog/tag/${tag}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
  ];
}
