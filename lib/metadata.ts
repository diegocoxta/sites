import type { MetadataRoute } from 'next';
import { NextResponse } from 'next/server';

import * as envs from '~/lib/envs';

import { getPages, getPosts, getTags } from '~/lib/md';

export function createSitemap(domain: string): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...getPages(domain).map(({ slug }) => ({
      url: `https://${domain}/${slug}`,
      priority: 0.8,
    })),
    ...getTags(domain).map((tag) => ({
      url: `https://${domain}/blog/tag/${tag}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
    ...getPosts(domain).map(({ slug }) => ({
      url: `https://${domain}/blog/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}

export function createRobots(domain: string) {
  return new NextResponse(
    `
User-agent: *
Allow: /

Sitemap: https://${domain}/sitemap.xml
`.trim(),
    {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
      },
    }
  );
}

export function createManifest({ name, description }: MetadataRoute.Manifest) {
  return NextResponse.json(
    {
      name,
      short_name: name,
      description: description,
      start_url: '/',
      display: 'standalone',
      theme_color: envs.SITE_ACCENT_COLOR,
      icons: [
        {
          src: '/icon',
          sizes: 'any',
          type: 'image/png',
        },
      ],
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
}
