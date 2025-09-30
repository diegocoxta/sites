import Link from 'next/link';

import Divisor from '~/components/Divisor';
import Container from '~/components/Container';
import Title from '~/components/Title';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import { getPosts } from '~/app/cms';

export default function HomePage() {
  return (
    <>
      <Divisor />
      <Container>
        {getPosts().map((post, index: number) => (
          <article key={`article-${index}`}>
            <Title>
              <Link href={`/notes/${post.slug}`}>{post.title}</Link>
            </Title>
            <Attributes {...post} />
            <Article>{post.expanded ? post.content : post.summary!}</Article>
          </article>
        ))}
      </Container>
    </>
  );
}
