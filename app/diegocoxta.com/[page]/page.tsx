import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPages, readFile } from '~/lib/cms';

import Container from '~/components/Container';
import Divisor from '~/components/Divisor';
import Title from '~/components/Title';
import Footer from '~/components/Footer';
import Article from '~/components/Article';
import MiniHeader from '~/components/MiniHeader';
import Username from '~/components/Username';
import Avatar from '~/components/Avatar';

import config from '~/app/diegocoxta.com/config';

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const content = readFile(config.domain, `/pages/${page}`);

  return (
    <>
      <MiniHeader>
        <Avatar src={config.avatar} size={32} alt={config.title} />
        <Link href="/">
          <Username username={config.title} />
        </Link>
      </MiniHeader>
      <Divisor />
      <Container>
        <Title>{content?.title}</Title>
        <Article>{content?.content}</Article>
      </Container>
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
