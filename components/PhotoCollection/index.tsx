import Image from 'next/image';
import styles from './styles.module.css';

interface PhotoCollectionProps {
  photos: Array<{
    id: string;
    slug: string;
    created_at: string;
    updated_at: string;
    blur_hash: string;
    asset_type: string;
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
    };
  }>;
}

export default function PhotoCollection(props: PhotoCollectionProps) {
  const featured = props.photos[0];
  const additional = props.photos.slice(1);

  return (
    <div className={styles.container}>
      <div className={styles.featuredPhoto} style={{ backgroundImage: `url(${featured?.urls.regular})` }}></div>
      <ul className={styles.additional}>
        <li className={styles.photo} style={{ backgroundImage: `url(${additional[0]?.urls.regular})` }}></li>
        <li className={styles.photo} style={{ backgroundImage: `url(${additional[1]?.urls.regular})` }}></li>
      </ul>
    </div>
  );
}
