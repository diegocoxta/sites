import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';

import Container from '~/components/Container';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, page[1] || config.locales[0]);

  if (!doc) {
    notFound();
  }

  return (
    <Container>
      <Article>{doc.content}</Article>
    </Container>
  );
}

export const generateStaticParams = () =>
  content
    .getPages()
    .flatMap(({ slug }) => [{ page: [slug] }, ...config.locales.map((locale) => ({ page: [slug, locale] }))]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, page[1] || config.locales[0]);

  if (!doc) {
    notFound();
  }

  return { title: doc.title, description: doc.summary };
}
