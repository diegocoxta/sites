import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { Container, Article } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;

  const t = getTranslations(config);
  const doc = content.readFile(`/pages/${page[0]}`, page[1] || config.locales[0]);

  if (!doc) {
    notFound();
  }

  return (
    <Container>
      <Article t={t} renderHeader={false} {...doc} />
    </Container>
  );
}

export const generateStaticParams = () =>
  content
    .getAllPages()
    .flatMap(({ slug }) => [{ page: [slug] }, ...config.locales.map((locale) => ({ page: [slug, locale] }))]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, page[1] || config.locales[0]);

  if (!doc) {
    notFound();
  }

  return { title: doc.title, description: doc.summary };
}
