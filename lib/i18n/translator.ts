import type { Locale } from '~/lib/i18n/locale';

export type Translator = {
  (key: string, params?: Record<string, string | number>): string;
  date: (value: string | number | Date, options?: Intl.DateTimeFormatOptions) => string;
  locale: Locale;
};

export type ComponentWithTranslator<P = unknown> = P & { t: Translator };

const TRANSLATABLE_KEY = /^(client|config|components|page)\./;

export function createTranslator(messages: Record<string, string>, locale: Locale): Translator {
  const t = ((key: string, params?: Record<string, string | number>): string => {
    const value = messages[key];

    if (value === undefined) {
      if (process.env.NODE_ENV !== 'production' && TRANSLATABLE_KEY.test(key)) {
        console.warn(`[i18n] missing key: "${key}" (${locale})`);
      }

      return key;
    }

    return params
      ? value.replace(/\{(\w+)\}/g, (_, name: string) => (name in params ? String(params[name]) : `{${name}}`))
      : value;
  }) as Translator;

  t.locale = locale;
  t.date = (value, options): string => new Date(value).toLocaleDateString(locale, { timeZone: 'UTC', ...options });

  return t;
}
