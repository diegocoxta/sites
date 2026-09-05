import Image from 'next/image';
import Link from 'next/link';

import type { Translator } from '~/lib/i18n';

import type { Collection } from '~/lib/unsplash';

import styles from './styles.module.css';

interface PhotoCollectionListProps {
  collections: Collection[];
  t: Translator;
}

export default function PhotoCollectionList({ collections, t }: PhotoCollectionListProps): React.ReactElement {
  return (
    <ul className={styles.grid}>
      {collections.map((collection) => (
        <li key={collection.id}>
          <Link className={styles.card} href={`/collections/${collection.id}`}>
            <div className={styles.cover}>
              {collection.coverUrl && (
                <Image src={collection.coverUrl} alt="" fill sizes="(max-width: 700px) 100vw, 320px" aria-hidden />
              )}
            </div>
            <div className={styles.meta}>
              <h2 className={styles.title}>{collection.title}</h2>
              <p className={styles.count}>{t('page.collections.photoCount', { count: collection.totalPhotos })}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
