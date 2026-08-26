import { NextResponse } from 'next/server';

import * as envs from '~/lib/envs';

import config from '~/app/diegocosta.me/config';

export const GET = () => {
  return NextResponse.json(
    {
      name: config.title,
      short_name: config.title,
      description: config.description,
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
};
