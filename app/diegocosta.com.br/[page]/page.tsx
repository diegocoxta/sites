import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import Title from '~/components/Title';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';

import { getPages, readFile } from '~/lib/cms';

import config from '~/app/diegocosta.com.br/config';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(config.domain, `/pages/${page}`);

  return (
    <>
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
      <Divisor />
    </>
  );
}

export const generateStaticParams = () => getPages(config.domain).map(({ slug: page }) => ({ page }));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const content = readFile(config.domain, `/pages/${page}`);

  if (!content) {
    return notFound();
  }

  return { title: content?.title, description: content?.summary };
}
