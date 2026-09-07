import styles from './styles.module.css';

export default function PageTitle({ children }: React.PropsWithChildren) {
  return <h1 className={styles.title}>{children}</h1>;
}
