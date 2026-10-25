import type { Metadata, MetadataRoute } from 'next';

import type { ConfigType } from '~/lib/config';

type SiteLocalesType = Pick<ConfigType, 'domain' | 'locales'>;

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

export function localizedSitemapEntries(
  { domain, locales }: SiteLocalesType,
  path: string,
  entry: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `https://${domain}/${locale}${path}`]));

  return locales.map((locale) => ({ url: `https://${domain}/${locale}${path}`, ...entry, alternates: { languages } }));
}
