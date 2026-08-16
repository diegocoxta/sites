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
    <>
      <span className={styles.handler}>@</span>
      <span>{isHandler ? props.username.slice(1) : props.username}</span>
    </>
  );

  if (props.href) {
    return (
      <h1 className={styles.username} style={{ fontSize: props.size }}>
        <Link href={props.href} className={styles.link}>
          {children}
        </Link>
      </h1>
    );
  }

  return (
    <h1 className={styles.username} style={{ fontSize: props.size }}>
      {children}
    </h1>
  );
}
