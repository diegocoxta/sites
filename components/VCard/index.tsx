import styles from './styles.module.css';

interface VCardProps extends React.PropsWithChildren {
  horizontal?: boolean;
}

export default function VCard(props: VCardProps) {
  return <div className={`${styles.container} ${props.horizontal ? styles.horizontal : ''}`}>{props.children}</div>;
}
