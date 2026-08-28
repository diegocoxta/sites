import { NextRequest } from 'next/server';

export const SUPPORTED_LANGUAGES = ['pt', 'en', 'es'] as const;

export type SupportedLanguageKey = (typeof SUPPORTED_LANGUAGES)[number];
export type MultiLanguageString = string | Record<SupportedLanguageKey, string>;

export function getLocatedString(value: MultiLanguageString, lang?: SupportedLanguageKey): string {
  if (typeof value === 'string') {
    return value;
  }

  const defaultLang = SUPPORTED_LANGUAGES[0];

  return (lang && value[lang]) || value[defaultLang] || '';
}

export function getPreferredLanguage(request: NextRequest): SupportedLanguageKey {
  const acceptLanguage = request.headers.get('accept-language');
  const defaultLang: SupportedLanguageKey = SUPPORTED_LANGUAGES[0];

  if (!acceptLanguage) return defaultLang;

  const requestedLangs = acceptLanguage.split(',').map((lang) => lang.split(';')[0].trim().split('-')[0]);

  const match = requestedLangs.find((lang) => (SUPPORTED_LANGUAGES as readonly string[]).includes(lang));

  return (match as SupportedLanguageKey) || defaultLang;
}
