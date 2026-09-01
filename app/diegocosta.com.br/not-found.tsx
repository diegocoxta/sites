import Container from '~/components/Container';
import CodeBlock from '~/components/CodeBlock';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.com.br/config';

export default function NotFoundPage() {
  const t = getTranslations(config);

  return (
    <Container>
      <CodeBlock className="language-plain">{t('page.notFound.message')}</CodeBlock>
      <p>
        <a href={`https://${config.domain}`}>{config.domain}</a>
      </p>
    </Container>
  );
}
