import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { isSupportedLocale } from '~/lib/i18n';
import { getMessages, getTranslations } from '~/lib/i18n/messages';
import { personLd, websiteLd } from '~/lib/schema';

import TranslationProvider from '~/components/shared/TranslationProvider';
import HtmlLang from '~/components/shared/HtmlLang';
import JsonLd from '~/components/shared/JsonLd';
import { Container } from '~/components/diegocosta.me';
import Footer from '~/components/shared/Footer';

import config from '~/app/diegocosta.me/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return config.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, modal, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(config.locales, locale)) {
    notFound();
  }

  const t = getTranslations(config, locale);
  const messages = getMessages(config, locale);

  return (
    <TranslationProvider messages={messages} locale={t.locale}>
      <HtmlLang locale={t.locale} />
      <JsonLd data={websiteLd(config, t(config.title))} />
      <JsonLd data={personLd(config)} />
      <Container>{children}</Container>
      <Footer t={t} name={config.author} />
      {modal}
    </TranslationProvider>
  );
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(config, locale);
  const image = '/og/home';

  return {
    metadataBase: new URL(`https://${config.domain}`),
    manifest: `/${t.locale}/manifest.json`,
    title: {
      template: `%s | ${t(config.title)}`,
      default: t(config.title),
    },
    description: t(config.description),
    openGraph: { siteName: t(config.title), url: `/${t.locale}`, images: [image] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}
