import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import Article from '~/components/Article';

import config from '~/app/diegocoxta.com/config';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[]; locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page, locale } = await params;

  const t = getTranslations(config);
  const doc = content.readFile(`/pages/${page[0]}`, locale);

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
    .getPages()
    .flatMap(({ slug }) => [{ page: [slug] }, ...config.locales.map((locale) => ({ page: [slug], locale }))]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page, locale } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, locale);

  if (!doc) {
    notFound();
  }

  return { title: doc.title, description: doc.summary };
}
