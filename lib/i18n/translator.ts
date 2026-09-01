import type { Locale } from '~/lib/i18n/locale';

export type Translator = {
  (key: string, params?: Record<string, string | number>): string;
  date: (value: string | number | Date, options?: Intl.DateTimeFormatOptions) => string;
  locale: Locale;
};

export type ComponentWithTranslator<P = unknown> = P & { t: Translator };

const TRANSLATABLE_KEY = /^(client|config|components|page)\./;

export function createTranslator(messages: Record<string, string>, locale: Locale): Translator {
  const lookup = (key: string): string | undefined => {
    const direct = messages[key];

    if (typeof direct === 'string') {
      return direct;
    }

    return undefined;
  };

  const t = ((key: string, params?: Record<string, string | number>): string => {
    const value = lookup(key);

    if (value === undefined) {
      if (process.env.NODE_ENV !== 'production' && TRANSLATABLE_KEY.test(key)) {
        console.warn(`[i18n] chave ausente: "${key}" (${locale})`);
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
