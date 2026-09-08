import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { getClientMessages, getTranslations } from '~/lib/i18n/messages';
import { personLd, websiteLd } from '~/lib/schema';

import TranslationProvider from '~/components/TranslationProvider';
import HtmlLang from '~/components/HtmlLang';
import JsonLd from '~/components/JsonLd';
import { Container } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';

export default function RootLayout({ children, modal }: React.PropsWithChildren<{ modal: React.ReactNode }>) {
  const t = getTranslations(config);
  const messages = getClientMessages(config);

  return (
    <ThemeProvider forcedTheme={config.theme.defaultTheme}>
      <TranslationProvider messages={messages} locale={t.locale}>
        <HtmlLang locale={t.locale} />
        <JsonLd data={websiteLd(config, t(config.title))} />
        <JsonLd data={personLd(config)} />
        <Container>{children}</Container>
        {modal}
      </TranslationProvider>
    </ThemeProvider>
  );
}

export function generateMetadata(): Metadata {
  const t = getTranslations(config);
  const image = '/og/home';

  return {
    metadataBase: new URL(`https://${config.domain}`),
    title: {
      template: `%s | ${t('page.photos.heading')} - ${t(config.title)}`,
      default:  `${t('page.photos.heading')} - ${t(config.title)}`,
    },
    description: t(config.description),
    openGraph: { siteName: t(config.title), url: '/', images: [image] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}
