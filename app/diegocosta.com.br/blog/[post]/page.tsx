import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import PageName from '~/components/PageName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import { getPosts, readFile } from '~/lib/cms';

import config from '~/app/diegocosta.com.br/config';

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;
  const content = readFile(config.domain, `/posts/${post}`);

  return (
    <Container>
      <PageName>blog</PageName>
      <Title>{content?.title}</Title>
      <Attributes {...content} />
      <Article>{content?.content}</Article>
    </Container>
  );
}

export const generateStaticParams = () => getPosts(config.domain).map(({ slug: post }) => ({ post }));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const content = readFile(config.domain, `/posts/${post}`);

  if (!content) {
    notFound();
  }

  return { title: content?.title, description: content?.summary };
}
