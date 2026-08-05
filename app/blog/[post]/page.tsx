import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Links from '~/components/Links';
import Container from '~/components/Container';
import Divisor from '~/components/Divisor';
import Attributes from '~/components/Attributes';
import Title from '~/components/Title';
import Article from '~/components/Article';
import Layout from '~/components/Layout';

import { getPages, getPosts, profile, readFile } from '~/lib/cms';

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;
  const content = readFile(`/posts/${post}`);

  return (
    <Layout repository={profile.repository.url} author={profile.author} posts={getPosts()} pages={getPages()}>
      <Container>
        <Title>{content?.title}</Title>
        <Attributes {...content} />
        <Article>{content?.content}</Article>
      </Container>
      <Divisor />
      <Links links={profile.links} />
    </Layout>
  );
}

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({
    post: slug,
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
