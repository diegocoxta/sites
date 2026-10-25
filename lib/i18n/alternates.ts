import type { Metadata } from 'next';

import type { ConfigType } from '~/lib/config';

export function localizedAlternates(
  { locales }: Pick<ConfigType, 'locales'>,
  locale: string,
  path = ''
): NonNullable<Metadata['alternates']> {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((entry) => [entry, `/${entry}${path}`])),
      'x-default': `/${locales[0]}${path}`,
    },
  };
}
