import { notFound } from 'next/navigation';

import { isSupportedLocale } from '~/lib/i18n';
import { getClientMessages, getTranslations } from '~/lib/i18n/messages';

import TranslationProvider from '~/components/TranslationProvider';

import config from '~/app/diegocoxta.com/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return config.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(config.locales, locale)) {
    notFound();
  }

  const t = getTranslations(config, locale);
  const messages = getClientMessages(config, locale);

  if (Object.keys(messages).length === 0) {
    return children;
  }

  return (
    <TranslationProvider messages={messages} locale={t.locale}>
      {children}
    </TranslationProvider>
  );
}
