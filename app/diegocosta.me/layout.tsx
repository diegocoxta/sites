import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { getClientMessages, getTranslations } from '~/lib/i18n/messages';

import TranslationProvider from '~/components/TranslationProvider';
import PersonSchema from '~/components/PersonSchema';
import Container from '~/components/Container';

import config from '~/app/diegocosta.me/config';

export default function RootLayout({ children, modal }: React.PropsWithChildren<{ modal: React.ReactNode }>) {
  const t = getTranslations(config);
  const messages = getClientMessages(config);

  return (
    <ThemeProvider defaultTheme={config.theme.defaultTheme}>
      <TranslationProvider messages={messages} locale={t.locale}>
        <PersonSchema data={config} />
        <Container maxWidth="1600px">{children}</Container>
        {modal}
      </TranslationProvider>
    </ThemeProvider>
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
