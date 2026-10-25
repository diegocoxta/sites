import { localeStaticParams, resolveLocale } from '~/lib/i18n';
import { getTranslations } from '~/lib/i18n/messages';
import { manifestResponse } from '~/lib/manifest';

import config from '~/app/diegocosta.me/config';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return localeStaticParams(config.locales);
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale(config.locales, (await params).locale);
  const t = getTranslations(config, locale);

  return manifestResponse({
    config,
    t,
    locale,
    name: t(config.title),
    shortName: config.author,
    backgroundColor: '#0e0807',
  });
}
