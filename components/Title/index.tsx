import styles from './styles.module.css';

interface TitleProps extends React.PropsWithChildren {
  fontSize?: number;
}

export default function Title({ children, fontSize }: TitleProps): React.ReactElement {
  return (
    <h2 className={styles.container} data-testid="title" style={{ fontSize }}>
      {children}
    </h2>
  );
}
