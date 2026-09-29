import styles from './styles.module.css';

export default function FlashMessage(props: React.PropsWithChildren) {
  return <p className={styles.container}>{props.children}</p>;
}
