import styles from './styles.module.css';

export default function Center({ children }: React.PropsWithChildren): React.ReactElement {
  return <div className={styles.container}>{children}</div>;
}
