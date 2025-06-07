import { type Metadata } from 'next';
import Link from 'next/link';

import Divisor from '~/components/Divisor';
import Container from '~/components/Container';
import TagName from '~/components/TagName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import { getPosts, getTags } from '~/app/cms';

interface TagsSinglePageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getTags().map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagsSinglePageProps): Promise<Metadata> {
  const { tag } = await params;

  return { title: `#${tag}` };
}

export default async function TagsSinglePage({ params }: TagsSinglePageProps) {
  const { tag } = await params;

  return (
    <>
      <Divisor />
      <Container>
        <TagName>#{tag}</TagName>
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
    </>
  );
}
