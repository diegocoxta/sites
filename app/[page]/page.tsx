import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import Title from '~/components/Title';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';
import Links from '~/components/Links';

import { getPages, profile, readFile } from '~/lib/cms';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(`/pages/${page}`);

  return (
    <>
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
      <Divisor />
      <Links links={profile.links} />
    </>
  );
}

export const generateStaticParams = () => getPages().map(({ slug: page }) => ({ page }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const content = readFile(`/pages/${page}`);

  if (!content) {
    return notFound();
  }

  return { title: content?.title, description: content?.summary };
}
