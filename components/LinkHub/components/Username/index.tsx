import styles from './styles.module.css';

interface UsernameProps {
  username: string;
  size?: number;
}

export default function Username(props: UsernameProps) {
  const isHandler = props.username.startsWith('@');

  return (
    <h1 className={styles.username} style={{ fontSize: props.size }}>
      <span className={styles.handler}>@</span>
      <span>{isHandler ? props.username.slice(1) : props.username}</span>
    </h1>
  );
}
