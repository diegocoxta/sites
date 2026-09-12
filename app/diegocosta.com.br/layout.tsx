import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import { contentFor, type ContentAttributes } from '~/lib/content';
import { getClientMessages, getTranslations } from '~/lib/i18n/messages';
import { personLd, websiteLd } from '~/lib/schema';

import TranslationProvider from '~/components/TranslationProvider';
import HtmlLang from '~/components/HtmlLang';
import JsonLd from '~/components/JsonLd';
import Logo from '~/components/Logo';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import { Header, CommandBar, Footer } from '~/components/Blog';

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
        <HtmlLang locale={t.locale} />
        <JsonLd data={websiteLd(config, config.title)} />
        <JsonLd data={personLd(config)} />
        <Header
          left={<Logo name={config.author} />}
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
        <Footer author={config.author} links={config.links} repository={config.repository} t={t} />
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
      types: {
        'application/rss+xml': `https://${config.domain}/blog/feed`,
      },
    },
  };
}
