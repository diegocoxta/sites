import styles from './styles.module.css';

export type HubProps = React.PropsWithChildren<{ background?: string }>;

export default function Hub({ background, children }: HubProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
