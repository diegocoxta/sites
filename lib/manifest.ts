import { NextResponse } from 'next/server';

import type { ConfigType } from '~/lib/config';
import type { Translator } from '~/lib/i18n';

type ManifestOptions = {
  config: Pick<ConfigType, 'theme' | 'locales' | 'description'>;
  t: Translator;
  name: string;
  shortName: string;
  backgroundColor: string;
  locale?: string;
};

export function manifestResponse({ config, t, name, shortName, backgroundColor, locale }: ManifestOptions) {
  const start = locale ? `/${locale}` : '/';

  return NextResponse.json(
    {
      id: start,
      name,
      short_name: shortName,
      description: t(config.description),
      lang: locale ?? config.locales[0],
      dir: 'ltr',
      start_url: start,
      display: 'standalone',
      theme_color: config.theme.accentColor,
      background_color: backgroundColor,
      icons: [{ src: '/icon', sizes: 'any', type: 'image/png' }],
    },
    { headers: { 'Cache-Control': 'public, max-age=86400' } }
  );
}
