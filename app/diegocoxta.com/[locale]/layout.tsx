import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '~/lib/i18n';
import { getClientMessages, getTranslations } from '~/lib/i18n/messages';
import { personLd, websiteLd } from '~/lib/schema';

import TranslationProvider from '~/components/TranslationProvider';
import HtmlLang from '~/components/HtmlLang';
import JsonLd from '~/components/JsonLd';

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

  const head = (
    <>
      <HtmlLang locale={t.locale} />
      <JsonLd data={websiteLd(config, `${config.author} (${config.title})`)} />
      <JsonLd data={personLd(config)} />
    </>
  );

  if (Object.keys(messages).length === 0) {
    return (
      <>
        {head}
        {children}
      </>
    );
  }

  return (
    <TranslationProvider messages={messages} locale={t.locale}>
      {head}
      {children}
    </TranslationProvider>
  );
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;

  return { manifest: `/manifest.json?locale=${locale}` };
}
