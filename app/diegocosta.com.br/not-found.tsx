'use client';

import Container from '~/components/Container';
import CodeBlock from '~/components/CodeBlock';

import config from '~/app/diegocosta.com.br/config';

export default function NotFoundPage() {
  return (
    <Container>
      <CodeBlock className="language-plain">{`Sinto muito mas a página que você está buscando não foi encontrada. Vá para <a href="https://${config.domain}">${config.domain}</a>`}</CodeBlock>
    </Container>
  );
}
