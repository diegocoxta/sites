import Image, { getImageProps } from 'next/image';

import styles from './styles.module.css';

interface VinylRecordProps {
  coverSrc?: string;
  title: string;
  size?: number;
}

export default function VinylRecord(props: VinylRecordProps) {
  const { coverSrc, title, size = 300 } = props;

  let src = '';

  if (coverSrc) {
    const { props } = getImageProps({
      alt: title,
      src: coverSrc,
      width: size,
      height: size,
      fetchPriority: 'high',
    });

    src = props.src;
  }

  // `size` is the sleeve's natural width; the layout below is expressed as ratios
  // of it, so the record shrinks to fit whatever box it lands in.
  const containerStyle = { '--vinyl-size': `${size}px` } as React.CSSProperties;

  return (
    <div className={styles.container} style={containerStyle}>
      <div className={styles.sleeve} style={{ backgroundImage: `url(${src})` }} />
      <div className={styles.vinylContainer}>
        <div className={styles.vinyl}>
          <div className={styles.branding}>
            {coverSrc && <Image width={size} height={size} src={coverSrc} alt={title} className={styles.cover} />}
            <div className={styles.hole} />
          </div>
        </div>
      </div>
    </div>
  );
}
