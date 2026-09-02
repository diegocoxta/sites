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
    pubDate: new Date(),
  });

  content.getPosts().forEach((post) => {
    feed.item({
      title: post.title,
      url: `https://${config.domain}${post.href}`,
      date: post.date!,
      description: post.summary ?? '',
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
