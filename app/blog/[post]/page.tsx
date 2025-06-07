import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import Divisor from '~/components/Divisor';
import Attributes from '~/components/Attributes';
import Title from '~/components/Title';
import Article from '~/components/Article';

import { getPosts, readFile } from '~/app/cms';

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export function generateStaticParams() {
  return getPosts().map((page) => ({
    post: page.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const content = readFile(`/posts/${post}`);

  if (!content) {
    notFound();
  }

  return { title: content?.title, description: content?.summary };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;
  const content = readFile(`/posts/${post}`);

  return (
    <>
      <Divisor />
      <Container>
        <Title>{content?.title}</Title>
        <Attributes {...content} />
        <Article>{content?.content}</Article>
      </Container>
    </>
  );
}
