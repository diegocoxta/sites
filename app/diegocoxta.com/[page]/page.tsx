import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '~/components/Container';
import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Divisor from '~/components/Divisor';
import Title from '~/components/Title';
import Article from '~/components/Article';
import Footer from '~/components/Footer';

import { getPages, readFile } from '~/lib/cms';

import config from '~/app/diegocoxta.com/config';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(config.domain, `/pages/${page}`);

  return (
    <>
      <Header name={config.title} size={28} avatar={config.avatar}>
        <ThemeSwitcher />
      </Header>
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
      <Divisor />
      <Footer author={config.title} />
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
