import styles from './styles.module.css';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({ left, right }: HeaderProps) {
  return (
    <header className={styles.container}>
      {left && <div className={styles.left}>{left}</div>}
      {right && <div className={styles.right}>{right}</div>}
    </header>
  );
}
