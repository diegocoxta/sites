import type { Metadata } from 'next';

import { getPages, getPosts } from '~/lib/mdcms';

import Header from '~/components/Header';
import Branding from '~/components/Branding';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import config from '~/app/diegocosta.com.br/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  const pages = getPages(config.domain);
  const posts = getPosts(config.domain);

  return (
    <>
      <Header
        left={<Branding name={config.author} />}
        right={
          <>
            <ThemeSwitcher />
            <CommandBar pages={pages} posts={posts} repository={config.repository.url} />
          </>
        }
      />
      {children}
      <Footer sourceCode={config.repository.url} author={config.author} links={config.links} />
    </>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
};
