import Link from 'next/link';

import Divisor from '~/components/Divisor';
import Links from '~/components/Links';
import Container from '~/components/Container';
import PageName from '~/components/PageName';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import { getPosts, profile } from '~/lib/cms';

export default function HomePage() {
  return (
    <>
      <Container>
        <PageName>blog</PageName>
        {getPosts().map((post, index: number) => (
          <article key={`blog-article-${index}`}>
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
