import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { type ContentAttributes, contentFor } from '~/lib/content';
import { getClientMessages, getTranslations } from '~/lib/i18n/messages';

import TranslationProvider from '~/components/TranslationProvider';
import PersonSchema from '~/components/PersonSchema';
import Header from '~/components/Header';
import Branding from '~/components/Branding';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export default function RootLayout({ children }: React.PropsWithChildren) {
  const t = getTranslations(config);
  const messages = getClientMessages(config);

  const pages = content.getPages();
  const posts = content.getPosts();

  return (
    <ThemeProvider defaultTheme={config.theme.defaultTheme}>
      <TranslationProvider messages={messages} locale={t.locale}>
        <PersonSchema data={config} />
        <Header
          left={<Branding name={config.author} />}
          right={
            <>
              <ThemeSwitcher />
              <CommandBar
                content={[...posts, ...pages].map((p: ContentAttributes) => ({
                  href: p.href,
                  title: p.title,
                  language: p.language,
                }))}
                repository={config.repository}
              />
            </>
          }
        />
        {children}
        <Footer author={config.author} links={config.links} t={t} />
      </TranslationProvider>
    </ThemeProvider>
  );
}

export function generateMetadata(): Metadata {
  const t = getTranslations(config);

  return {
    metadataBase: new URL(`https://${config.domain}`),
    title: {
      template: `%s | ${config.title}`,
      default: config.title,
    },
    description: t(config.description),
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': `https://${config.domain}/blog/feed`,
      },
    },
  };
}
