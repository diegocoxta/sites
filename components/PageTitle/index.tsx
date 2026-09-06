import styles from './styles.module.css';

export default function PageTitle({ children }: React.PropsWithChildren) {
  return <h2 className={styles.title}>{children}</h2>;
}
