import Link from 'next/link';
import styles from './styles.module.css';

interface UsernameProps {
  username: string;
  size?: number;
  href?: string;
}

export default function Username(props: UsernameProps) {
  const isHandler = props.username.startsWith('@');

  const children = (
    <h1 className={styles.username} style={{ fontSize: props.size }}>
      <span className={styles.handler}>@</span>
      <span>{isHandler ? props.username.slice(1) : props.username}</span>
    </h1>
  );

  if (props.href) {
    return (
      <Link href={props.href} className={styles.link}>
        {children}
      </Link>
    );
  }

  return children;
}
