import { NextResponse } from 'next/server';

import { resolveLocale } from '~/lib/i18n';
import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocoxta.com/config';

export const revalidate = false;

// `?locale=` is set by the per-locale `<link rel="manifest">` in [locale]/layout.tsx.
export const GET = (request: Request) => {
  const locale = resolveLocale(config.locales, new URL(request.url).searchParams.get('locale'));
  const t = getTranslations(config, locale);
  const name = `${config.author} (${config.title})`;

  return NextResponse.json(
    {
      id: `/${locale}`,
      name,
      short_name: name,
      description: t(config.description),
      lang: locale,
      dir: 'ltr',
      start_url: `/${locale}`,
      display: 'standalone',
      theme_color: config.theme.accentColor,
      background_color: '#fdfdfd',
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
