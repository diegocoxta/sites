import { NextResponse } from 'next/server';

import config from '~/app/diegocosta.me/config';

export const revalidate = false;

export const GET = () => {
  const { domain } = config;

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
};
