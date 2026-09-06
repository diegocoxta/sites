import styles from './styles.module.css';

type ContainerProps = React.PropsWithChildren<{
  maxWidth?: string;
}>;

export default function Container({ children, maxWidth }: ContainerProps) {
  return (
    <section className={styles.container} style={{ maxWidth: maxWidth }}>
      {children}
    </section>
  );
}
