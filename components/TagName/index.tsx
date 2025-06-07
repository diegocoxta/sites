import styles from './styles.module.css';

export default function TagName({ children }: React.PropsWithChildren): React.ReactElement {
  return <div className={styles.title}>{children}</div>;
}
