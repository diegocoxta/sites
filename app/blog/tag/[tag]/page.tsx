import { type Metadata } from 'next';
import Link from 'next/link';

import Container from '~/components/Container';
import PageName from '~/components/PageName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';
import Divisor from '~/components/Divisor';
import Links from '~/components/Links';

import { getPosts, getTags, profile } from '~/lib/cms';

interface TagsSinglePageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsSinglePage({ params }: TagsSinglePageProps) {
  const { tag } = await params;

  return (
    <>
      <Container>
        <PageName>#{tag}</PageName>
        {getPosts()
          .filter((post) => post.tags?.includes(tag))
          .map((post, index: number) => (
            <article key={`article-${index}`}>
              <Title>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </Title>
              <Attributes {...post} />
              <Article>{post.expanded ? post.content : post.summary!}</Article>
            </article>
          ))}
      </Container>
      <Divisor />
      <Links links={profile.links} />
    </>
  );
}

export const generateStaticParams = () =>
  getTags().map((tag) => ({
    tag,
  }));

export async function generateMetadata({ params }: TagsSinglePageProps): Promise<Metadata> {
  const { tag } = await params;

  return { title: `#${tag}` };
}
