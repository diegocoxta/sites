import 'server-only';

import fs from 'node:fs';

import { cache } from 'react';

import { createTranslator, type Translator } from '~/lib/i18n/translator';
import { resolveLocale, type Locale } from '~/lib/i18n/locale';
import { publicPath } from '~/lib/public-path';
import type { SiteType } from '~/lib/config';

const loadDictionary = cache((domain: string, locale: Locale): Record<string, string> => {
  try {
    const raw = fs.readFileSync(publicPath(domain, 'translations', `${locale}.json`), 'utf-8');
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[i18n] missing dictionary: ${domain}/translations/${locale}.json`);
    }

    return {};
  }
});

function loadMessages(site: SiteType, locale: Locale): Record<string, string> {
  const fallback = site.locales[0];

  return locale === fallback
    ? loadDictionary(site.domain, locale)
    : { ...loadDictionary(site.domain, fallback), ...loadDictionary(site.domain, locale) };
}

export const getTranslations = cache((site: SiteType, locale?: string): Translator => {
  const resolved = resolveLocale(site.locales, locale);
  return createTranslator(loadMessages(site, resolved), resolved);
});

export const getClientMessages = cache((site: SiteType, locale?: string): Record<string, string> => {
  const messages = loadMessages(site, resolveLocale(site.locales, locale));

  return Object.fromEntries(Object.entries(messages).filter(([key]) => key.startsWith('client.')));
});
