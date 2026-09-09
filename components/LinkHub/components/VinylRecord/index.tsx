import Image from 'next/image';

import styles from './styles.module.css';

interface VinylRecordProps {
  coverSrc?: string;
  title: string;
}

export default function VinylRecord({ coverSrc, title }: VinylRecordProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sleeve}>
        {coverSrc && (
          <Image
            src={coverSrc}
            alt={title}
            fill
            sizes="(max-width: 575px) 40vw, 160px"
            className={styles.sleeveImage}
            fetchPriority="high"
          />
        )}
      </div>
      <div className={styles.vinylContainer}>
        <div className={styles.vinyl}>
          <div className={styles.branding}>
            {coverSrc && <Image src={coverSrc} alt="" fill sizes="48px" className={styles.cover} />}
            <div className={styles.hole} />
          </div>
        </div>
      </div>
    </div>
  );
}
