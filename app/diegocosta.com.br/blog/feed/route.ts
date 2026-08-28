import { NextResponse } from 'next/server';
import Rss from 'rss';

import { getPosts } from '~/lib/md';

import config from '~/app/diegocosta.com.br/config';

export async function GET() {
  const feed = new Rss({
    title: `${config.title}`,
    description: `${config.description}`,
    feed_url: `https://${config.domain}/blog/feed`,
    site_url: `https://${config.domain}`,
    pubDate: new Date(),
  });

  getPosts(config.domain).map((post) => {
    feed.item({
      title: post.title,
      url: `https://${config.domain}/blog/${post.slug}`,
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
