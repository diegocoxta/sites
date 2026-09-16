import styles from './styles.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  tinted?: boolean;
  className?: string;
}

export default function Skeleton(props: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={[styles.skeleton, props.tinted && styles.tinted, props.className].filter(Boolean).join(' ')}
      style={{ width: props.width, height: props.height, borderRadius: props.borderRadius }}
    />
  );
}
