import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import { getPages, getPosts } from '~/lib/cms';
import config from '~/app/diegocosta.com.br/config';

import './globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  const pages = getPages(config.domain);
  const posts = getPosts(config.domain);

  return (
    <ThemeProvider enableSystem={false}>
      <Header name={config.author}>
        <ThemeSwitcher />
        <CommandBar pages={pages} posts={posts} repository={config.repository.url} />
      </Header>
      {children}
      <Footer sourceCode={config.repository.url} author={config.author} links={config.links} />
    </ThemeProvider>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
};
