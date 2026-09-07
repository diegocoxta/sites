import type { Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { Container, PageTitle, Article } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <Container>
      <PageTitle>blog</PageTitle>
      {content.getPosts().map((post, index: number) => (
        <Article key={`blog-article-${index}`} t={t} expanded={false} {...post} />
      ))}
    </Container>
  );
}

export const metadata: Metadata = {
  title: 'Blog',
  alternates: { canonical: '/blog' },
};
