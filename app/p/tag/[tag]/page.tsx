import { type Metadata } from 'next';
import Link from 'next/link';

import Divisor from '~/components/Divisor';
import Container from '~/components/Container';
import TagName from '~/components/TagName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';
import Layout from '~/components/Layout';

import { getPages, getPosts, getTags, profile } from '~/app/cms';

interface TagsSinglePageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsSinglePage({ params }: TagsSinglePageProps) {
  const { tag } = await params;

  return (
    <Layout repository={profile.repository.url} author={profile.author} pages={[...getPosts(), ...getPages()]}>
      <Divisor />
      <Container>
        <TagName>#{tag}</TagName>
        {getPosts()
          .filter((post) => post.tags?.includes(tag))
          .map((post, index: number) => (
            <article key={`article-${index}`}>
              <Title>
                <Link href={`/p/${post.slug}`}>{post.title}</Link>
              </Title>
              <Attributes {...post} />
              <Article>{post.expanded ? post.content : post.summary!}</Article>
            </article>
          ))}
      </Container>
    </Layout>
  );
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
