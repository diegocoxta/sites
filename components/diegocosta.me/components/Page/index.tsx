import styles from './styles.module.css';

interface PageProps {
  leading: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page({ leading, trailing, children }: PageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.leading}>{leading}</div>
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
