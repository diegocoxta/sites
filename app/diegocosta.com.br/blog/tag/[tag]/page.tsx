import { type Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import PageTitle from '~/components/PageTitle';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface TagsSinglePageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsSinglePage({ params }: TagsSinglePageProps) {
  const { tag } = await params;

  const t = getTranslations(config);

  return (
    <Container>
      <PageTitle>#{tag}</PageTitle>
      {content
        .getPosts()
        .filter((post) => post.tags?.includes(tag))
        .map((post, index: number) => (
          <Article key={`article-${index}`} t={t} expanded={false} {...post} />
        ))}
    </Container>
  );
}

export const generateStaticParams = () => content.getTags().map((tag) => ({ tag }));

export async function generateMetadata({ params }: TagsSinglePageProps): Promise<Metadata> {
  const { tag } = await params;

  return { title: `#${tag}` };
}
