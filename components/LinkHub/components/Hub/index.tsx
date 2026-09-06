import styles from './styles.module.css';

export type LinkHubProps = React.PropsWithChildren<{ background?: string }>;

export default function LinkHub({ background, children }: LinkHubProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
