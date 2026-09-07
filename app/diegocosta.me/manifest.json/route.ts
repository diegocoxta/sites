import { NextResponse } from 'next/server';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.me/config';

export const revalidate = false;

export const GET = () => {
  const t = getTranslations(config);

  return NextResponse.json(
    {
      id: '/',
      name: t(config.title),
      short_name: t(config.title),
      description: t(config.description),
      lang: config.locales[0],
      dir: 'ltr',
      start_url: '/',
      display: 'standalone',
      theme_color: config.theme.accentColor,
      background_color: '#0e0807',
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
