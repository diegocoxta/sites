'use client';

import CodeBlock from '~/components/CodeBlock';
import styles from './styles.module.css';

export default function NotFound({ pathname }: { pathname: string }) {
  return (
    <div className={styles.container}>
      <CodeBlock className="language-plain">{`Sinto muito mas a página que você está buscando não foi encontrada. Vá para <a href="https://diegocosta.com.br">diegocosta.com.br</a>`}</CodeBlock>
    </div>
  );
}
