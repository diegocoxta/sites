import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { Container, PageTitle, Article } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;

  const t = getTranslations(config);
  const doc = content.readFile(`/blog/${post}`);

  if (!doc) {
    notFound();
  }

  return (
    <Container>
      <PageTitle>blog</PageTitle>
      <Article t={t} {...doc} />
    </Container>
  );
}

export const generateStaticParams = () => content.getAllPosts().map(({ slug: post }) => ({ post }));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const doc = content.readFile(`/blog/${post}`);

  if (!doc) {
    notFound();
  }

  return { title: doc.title, description: doc.summary };
}
