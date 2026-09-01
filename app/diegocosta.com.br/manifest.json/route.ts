import { NextResponse } from 'next/server';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.com.br/config';

export const revalidate = 76800;

export const GET = () => {
  const t = getTranslations(config);

  return NextResponse.json(
    {
      name: config.title,
      short_name: config.title,
      description: t(config.description),
      start_url: '/',
      display: 'standalone',
      theme_color: config.theme.accentColor,
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
