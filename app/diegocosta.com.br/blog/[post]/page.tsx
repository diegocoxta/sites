import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import Title from '~/components/Title';
import PageName from '~/components/PageName';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;

  const t = getTranslations(config);
  const doc = content.readFile(`/posts/${post}`);

  if (!doc) {
    notFound();
  }

  return (
    <Container>
      <PageName>blog</PageName>
      <article>
        <header>
          <Title>{doc.title}</Title>
          <Attributes {...doc} t={t} />
        </header>
        <Article>{doc.content}</Article>
      </article>
    </Container>
  );
}

export const generateStaticParams = () => content.getPosts().map(({ slug: post }) => ({ post }));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const doc = content.readFile(`/posts/${post}`);

  if (!doc) {
    notFound();
  }

  return { title: doc.title, description: doc.summary };
}
