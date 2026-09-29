import { NextResponse } from 'next/server';
import Rss from 'rss';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export const revalidate = 76800;

export function GET() {
  const t = getTranslations(config);

  const feed = new Rss({
    title: config.title,
    description: t(config.description),
    feed_url: `https://${config.domain}/blog/feed`,
    site_url: `https://${config.domain}`,
    language: 'pt-br',
    copyright: `CC-BY ${new Date().getFullYear()} ${config.author}`,
    pubDate: new Date(),
  });

  content.getPosts().forEach((post) => {
    const url = `https://${config.domain}${post.href}`;

    feed.item({
      title: post.title,
      url,
      guid: url,
      date: post.date!,
      description: post.summary ?? '',
      author: config.author,
      categories: post.tags ?? [],
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
