import styles from './styles.module.css';

interface TitleProps extends React.PropsWithChildren {
  fontSize?: number;
}

export default function Title({ children, fontSize }: TitleProps): React.ReactElement {
  return (
    <h3 className={styles.container} style={{ fontSize }}>
      {children}
    </h3>
  );
}
