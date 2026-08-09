import styles from './styles.module.css';

export default function MiniHeader(props: React.PropsWithChildren) {
  return <header className={styles.header}>{props.children}</header>;
}
