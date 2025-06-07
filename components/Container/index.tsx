import styles from './styles.module.css';

export default function Container({ children }: React.PropsWithChildren): React.ReactElement {
  return <section className={styles.container}>{children}</section>;
}
