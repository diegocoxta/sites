import Link from 'next/link';

import styles from './styles.module.css';
import Title from '../Title';
import Article from '../Article';

interface LinkEntryProps {
  title: string;
  href: string;
  description?: string;
}

export default function LinkEntry(props: LinkEntryProps) {
  return (
    <Link href={props.href} className={styles.container}>
      <Title>{props.title}</Title>
      {props.description && <p className={styles.description}>{props.description}</p>}
    </Link>
  );
}
