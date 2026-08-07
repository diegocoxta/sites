import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Links from '~/components/Links';
import Container from '~/components/Container';
import PageName from '~/components/PageName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';

import { getPosts, profile, readFile } from '~/lib/cms';

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;
  const content = readFile(`/posts/${post}`);

  return (
    <>
      <Container>
        <PageName>blog</PageName>
        <Title>{content?.title}</Title>
        <Attributes {...content} />
        <Article>{content?.content}</Article>
      </Container>
      <Divisor />
      <Links links={profile.links} />
    </>
  );
}

export const generateStaticParams = () => getPosts().map(({ slug: post }) => ({ post }));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const content = readFile(`/posts/${post}`);

  if (!content) {
    notFound();
  }

  return { title: content?.title, description: content?.summary };
}
