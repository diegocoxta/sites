import { NextResponse } from 'next/server';

import { resolveLocale } from '~/lib/i18n';
import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.me/config';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return config.locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale(config.locales, (await params).locale);
  const t = getTranslations(config, locale);

  return NextResponse.json(
    {
      id: `/${locale}`,
      name: t(config.title),
      short_name: config.author,
      description: t(config.description),
      lang: locale,
      dir: 'ltr',
      start_url: `/${locale}`,
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
}
