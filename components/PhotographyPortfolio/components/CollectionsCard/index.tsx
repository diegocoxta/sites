import Link from 'next/link';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import type { CollectionSummary } from '../../types';
import styles from './styles.module.css';

type CollectionsCardProps = ComponentWithTranslator<{
  collections: CollectionSummary[];
  /** How many to list before the "all collections" link. */
  limit?: number;
}>;

/** A standing shortlist of collections that links out to /collections. Sits alongside the profile tile. */
export default function CollectionsCard({ t, collections, limit = 5 }: CollectionsCardProps): React.ReactElement {
  return (
    <div className={styles.card}>
      <div className={styles.kicker}>{t('page.collections.title')}</div>
      <ul className={styles.list}>
        {collections.slice(0, limit).map((collection, index) => (
          <li key={collection.id}>
            <Link className={styles.item} href={`/collections/${collection.id}`}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.name}>{collection.title}</span>
              <span className={styles.count}>{collection.photoCount}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className={styles.all} href="/collections">
        {t('page.collections.backToList')}
      </Link>
    </div>
  );
}
