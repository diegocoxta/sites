import { type Metadata } from 'next';
import Link from 'next/link';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import Title from '~/components/Title';
import PageName from '~/components/PageName';
import Attributes from '~/components/Attributes';
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
      <PageName>#{tag}</PageName>
      {content
        .getPosts()
        .filter((post) => post.tags?.includes(tag))
        .map((post, index: number) => (
          <article key={`article-${index}`}>
            <header>
              <Title>
                <Link href={post.href}>{post.title}</Link>
              </Title>
              <Attributes {...post} t={t} />
            </header>
            <Article>{post.expanded ? post.content : post.summary!}</Article>
          </article>
        ))}
    </Container>
  );
}

export const generateStaticParams = () => content.getTags().map((tag) => ({ tag }));

export async function generateMetadata({ params }: TagsSinglePageProps): Promise<Metadata> {
  const { tag } = await params;

  return { title: `#${tag}` };
}
