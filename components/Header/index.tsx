import styles from './styles.module.css';

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header(props: HeaderProps): React.ReactElement {
  return (
    <header className={styles.container}>
      {props.left && <div className={styles.left}>{props.left}</div>}
      {props.right && <div className={styles.right}>{props.right}</div>}
    </header>
  );
}
