import { localeStaticParams, resolveLocale } from '~/lib/i18n';
import { getTranslations } from '~/lib/i18n/messages';
import { manifestResponse } from '~/lib/manifest';

import config from '~/app/diegocoxta.com/config';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return localeStaticParams(config.locales);
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale(config.locales, (await params).locale);
  const name = `${config.author} (${config.title})`;

  return manifestResponse({
    config,
    t: getTranslations(config, locale),
    locale,
    name,
    shortName: name,
    backgroundColor: '#fdfdfd',
  });
}
