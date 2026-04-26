'use client';

import CodeBlock from '~/components/CodeBlock';
import styles from './styles.module.css';

export default function NotFound({ pathname }: { pathname: string }) {
  return (
    <div className={styles.container}>
      <CodeBlock className="language-plain">{`$ open https://diegocosta.me${pathname}<br />I&apos;m sorry, but the page you&apos;re looking for cannot be found.`}</CodeBlock>
    </div>
  );
}
