import styles from './styles.module.css';

type ContainerProps = React.PropsWithChildren<{
  maxWidth?: string;
  padding?: string;
}>;

export default function Container({ children, maxWidth, padding }: ContainerProps) {
  return (
    <main className={styles.container} style={{ maxWidth, padding }}>
      {children}
    </main>
  );
}
