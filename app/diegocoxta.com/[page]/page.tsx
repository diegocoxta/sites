import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPages, readFile } from '~/lib/cms';

import Container from '~/components/Container';
import Divisor from '~/components/Divisor';
import Header from '~/components/Header';
import Avatar from '~/components/Avatar';
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
      <Header
        left={
          <>
            <Avatar src={config.avatar} size={32} alt={config.title} />
            <Username username={config.title} href="/" />
          </>
        }
      />
      <Divisor />
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
