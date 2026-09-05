import styles from './styles.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  colorInverted?: boolean;
  className?: string;
}

export default function Skeleton(props: SkeletonProps): React.ReactElement {
  return (
    <span
      aria-hidden
      className={[styles.skeleton, props.colorInverted && styles.inverted, props.className].filter(Boolean).join(' ')}
      style={{ width: props.width, height: props.height, borderRadius: props.borderRadius }}
    />
  );
}
