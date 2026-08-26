import type { MetadataRoute } from 'next';

import { getPages, getPosts, getTags } from '~/lib/md';

import config from '~/app/diegocosta.com.br/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const { domain } = config;

  const posts = getPosts(domain);
  const pages = getPages(domain);
  const tags = getTags(domain);

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
    ...pages.map(({ slug }) => ({
      url: `https://${domain}/${slug}`,
      priority: 0.8,
    })),
    ...tags.map((tag) => ({
      url: `https://${domain}/blog/tag/${tag}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
    ...posts.map(({ slug }) => ({
      url: `https://${domain}/blog/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
