import type { Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { PageTitle, Article } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <main>
      <PageTitle>{t('page.blog.title')}</PageTitle>
      {content.getPosts().map((post, index: number) => (
        <Article key={`blog-article-${index}`} t={t} expanded={false} {...post} />
      ))}
    </main>
  );
}

export function generateMetadata(): Metadata {
  const t = getTranslations(config);

  return {
    title: t('page.blog.title'),
    alternates: { canonical: '/blog' },
  };
}
