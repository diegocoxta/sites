import type { Metadata } from 'next';

import { getClientMessages, getTranslations } from '~/lib/i18n/messages';

import TranslationProvider from '~/components/TranslationProvider';
import PersonSchema from '~/components/PersonSchema';
import Header from '~/components/Header';
import Branding from '~/components/Branding';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Footer from '~/components/Footer';

import config from '~/app/diegocosta.me/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  const t = getTranslations(config);
  const messages = getClientMessages(config);

  return (
    <TranslationProvider messages={messages} locale={t.locale}>
      <PersonSchema data={config} />
      <Header left={<Branding name={config.author} />} right={<ThemeSwitcher />} />
      {children}
      <Footer author={config.author} t={t} />
    </TranslationProvider>
  );
}

export function generateMetadata(): Metadata {
  const t = getTranslations(config);

  return {
    metadataBase: new URL(`https://${config.domain}`),
    title: {
      template: `%s | ${t(config.title)}`,
      default: t(config.title),
    },
    description: t(config.description),
    alternates: {
      canonical: '/',
    },
  };
}
