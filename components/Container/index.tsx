import styles from './styles.module.css';

interface ContainerProps {
  maxWidth?: string;
}

export default function Container({ children, maxWidth }: React.PropsWithChildren<ContainerProps>): React.ReactElement {
  return (
    <section className={styles.container} style={{ maxWidth }}>
      {children}
    </section>
  );
}
