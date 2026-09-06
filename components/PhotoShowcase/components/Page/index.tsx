import styles from './styles.module.css';

interface PageProps {
  leading: React.ReactNode;
  children: React.ReactNode;
}

export default function Page({ leading, children }: PageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.leading}>{leading}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
