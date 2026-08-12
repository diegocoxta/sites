import Link from 'next/link';

import { getPosts } from '~/lib/mdcms';

import Container from '~/components/Container';
import Title from '~/components/Title';
import PageName from '~/components/PageName';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

export default function HomePage() {
  return (
    <Container>
      <PageName>blog</PageName>
      {getPosts(config.domain).map((post, index: number) => (
        <article key={`blog-article-${index}`}>
          <Title>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </Title>
          <Attributes {...post} />
          <Article>{post.expanded ? post.content : post.summary!}</Article>
        </article>
      ))}
    </Container>
  );
}
