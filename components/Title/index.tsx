import styles from './styles.module.css';

export default function Title({ children }: React.PropsWithChildren): React.ReactElement {
  return (
    <h2 className={styles.container} data-testid="title">
      {children}
    </h2>
  );
}
