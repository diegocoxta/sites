import styles from './styles.module.css';

interface UsernameProps {
  username: string;
  size?: number;
}

export default function Username({ username, size }: UsernameProps) {
  const isHandler = username.startsWith('@');

  return (
    <h1 className={styles.username} style={{ fontSize: size }}>
      <span className={styles.handler}>@</span>
      <span>{isHandler ? username.slice(1) : username}</span>
    </h1>
  );
}
