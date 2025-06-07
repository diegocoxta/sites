'use client';

import CodeBlock from '~/components/CodeBlock';
import styles from './styles.module.css';

export default function NotFound({ pathname }: { pathname: string }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
      <CodeBlock className="language-plain">{`diegocosta.me: page not found ${pathname}`}</CodeBlock>
      <p className={styles.content}>
        I&apos;m sorry, but the page you&apos;re looking for cannot be found. Please check the URL or try navigating
        through the menu of my website. If the issue persists, please contact me.
      </p>
    </div>
  );
}
