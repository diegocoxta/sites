import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPages, readFile } from '~/lib/mdcms';

import Container from '~/components/Container';
import Header from '~/components/Header';
import Username from '~/components/Username';
import Title from '~/components/Title';
import Article from '~/components/Article';

import config from '~/app/diegocoxta.com/config';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(config.domain, `/pages/${page}`);

  return (
    <>
      <Header left={<Username username={config.title} href="/" />} />
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
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
