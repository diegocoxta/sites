'use client';

import Container from '~/components/Container';
import CodeBlock from '~/components/CodeBlock';

export default function NotFoundPage() {
  return (
    <Container>
      <CodeBlock className="language-plain">{`Sinto muito mas a página que você está buscando não foi encontrada. Vá para <a href="https://diegocosta.com.br">diegocosta.com.br</a>`}</CodeBlock>
    </Container>
  );
}
