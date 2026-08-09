import Link from 'next/link';

import styles from './styles.module.css';

interface PageLinkProps {
  title: string;
  href: string;
  description?: string;
}

export default function PageLink(props: PageLinkProps) {
  return (
    <Link href={props.href} className={styles.container}>
      <p className={styles.title}>{props.title}</p>
      {props.description && <p className={styles.description}>{props.description}</p>}
    </Link>
  );
}
