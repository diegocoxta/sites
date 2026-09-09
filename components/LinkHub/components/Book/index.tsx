import { CSSProperties, useMemo } from 'react';

import styles from './styles.module.css';

export interface BookProps {
  coverSrc?: string;
  title: string;
  maxWidth?: number;
}

export default function Book({ coverSrc, title }: BookProps) {
  const titleScale = useMemo(() => {
    const length = title?.length || 1;
    const raw = 6 / Math.sqrt(length);
    return Math.min(1.6, Math.max(0.35, raw));
  }, [title]);

  const coverStyle: CSSProperties = coverSrc ? { backgroundImage: `url("${coverSrc}")` } : {};

  const titleStyle = {
    '--title-scale': titleScale,
  } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.book}>
        <div className={styles.cover} style={coverStyle} role="img" aria-label={title}>
          {!coverSrc && (
            <span className={styles.title} style={titleStyle}>
              {title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
