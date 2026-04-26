import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import Divisor from '~/components/Divisor';
import Title from '~/components/Title';
import Article from '~/components/Article';
import Layout from '~/components/Layout';

import { getPages, getPosts, profile, readFile } from '~/app/cms';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(`/pages/${page}`);

  return (
    <Layout repository={profile.repository.url} author={profile.author} pages={[...getPosts(), ...getPages()]}>
      <Divisor />
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
    </Layout>
  );
}

export function generateStaticParams() {
  return getPages().map(({ slug }) => ({
    page: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const content = readFile(`/pages/${page}`);

  if (!content) {
    return notFound();
  }

  return { title: content?.title, description: content?.summary };
}
