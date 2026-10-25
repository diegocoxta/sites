export * from '~/lib/i18n/locale';
export * from '~/lib/i18n/translator';
export * from '~/lib/i18n/alternates';
// `messages` is not re-exported on purpose: it is `server-only`, and this barrel is also used by Client Components and `proxy.ts`.
