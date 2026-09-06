import styles from './styles.module.css';

type ContainerProps = React.PropsWithChildren;

export default function Container({ children }: ContainerProps) {
  return <section className={styles.container}>{children}</section>;
}
