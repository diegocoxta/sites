import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';
import PageTitle from '~/components/PageTitle';
import Article from '~/components/Article';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <Container>
      <PageTitle>blog</PageTitle>
      {content.getPosts().map((post, index: number) => (
        <Article key={`blog-article-${index}`} t={t} expanded={false} {...post} />
      ))}
    </Container>
  );
}
