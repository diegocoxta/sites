import Link from 'next/link';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import Title from '~/components/Title';
import PageName from '~/components/PageName';
import Attributes from '~/components/Attributes';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <Container>
      <PageName>blog</PageName>
      {content.getPosts().map((post, index: number) => (
        <article key={`blog-article-${index}`}>
          <header>
            <Title>
              <Link href={post.href}>{post.title}</Link>
            </Title>
            <Attributes {...post} t={t} />
          </header>
          <Article>{post.expanded ? post.content : post.summary!}</Article>
        </article>
      ))}
    </Container>
  );
}
