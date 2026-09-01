export const LOCALES = ['pt', 'en', 'es'] as const;

export const LOCALE_COOKIE = 'LOCALE';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type Locale = (typeof LOCALES)[number];

export function isSupportedLocale(supported: readonly Locale[], value?: string | null): value is Locale {
  return !!value && (supported as readonly string[]).includes(value);
}

export function resolveLocale(supported: readonly Locale[], value?: string | null): Locale {
  return isSupportedLocale(supported, value) ? value : supported[0];
}

export function parseAcceptLanguage(header?: string | null): string[] {
  return (header ?? '')
    .split(',')
    .map((part) => {
      const [tag, ...modifiers] = part.trim().split(';');
      const weight = modifiers.map((modifier) => modifier.trim()).find((modifier) => modifier.startsWith('q='));
      const q = weight ? Number(weight.slice(2)) : 1;

      return { tag: tag.trim().slice(0, 2).toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.tag);
}

export function negotiateLocale(
  supported: readonly Locale[],
  cookie?: string | null,
  acceptLanguage?: string | null
): Locale {
  if (isSupportedLocale(supported, cookie)) {
    return cookie;
  }

  for (const tag of parseAcceptLanguage(acceptLanguage)) {
    if (isSupportedLocale(supported, tag)) {
      return tag;
    }
  }

  return supported[0];
}
