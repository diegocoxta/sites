import styles from './styles.module.css';

interface ContainerProps extends React.PropsWithChildren {
  maxWidth?: number;
}

export default function Container({ children, maxWidth }: ContainerProps): React.ReactElement {
  return (
    <section className={styles.container} style={{ maxWidth }}>
      {children}
    </section>
  );
}
