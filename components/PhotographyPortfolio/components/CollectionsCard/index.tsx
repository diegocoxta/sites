import Link from 'next/link';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import type { CollectionSummary } from '../../types';
import styles from './styles.module.css';

type CollectionsCardProps = ComponentWithTranslator<{
  collections: CollectionSummary[];
  /** How many to list between the "all photos" and "all collections" links. */
  limit?: number;
  /** The collection currently on screen — its row is highlighted when it shows up in the list. */
  activeId?: string;
}>;

/** A standing shortlist of collections, bracketed by fixed links to the full feed and the collections index. */
export default function CollectionsCard({
  t,
  collections,
  limit = 5,
  activeId,
}: CollectionsCardProps): React.ReactElement {
  return (
    <div className={styles.card}>
      <div className={styles.kicker}>{t('page.collections.title')}</div>
      <Link className={styles.top} href="/">
        {t('page.photos.backToList')}
      </Link>
      <ul className={styles.list}>
        {collections.slice(0, limit).map((collection, index) => (
          <li key={collection.id}>
            <Link
              className={`${styles.item} ${collection.id === activeId ? styles.active : ''}`}
              href={`/collections/${collection.id}`}
            >
              {/* Numbered from the total down, so the newest (first) reads as the highest — not "01". */}
              <span className={styles.index}>{String(collections.length - index).padStart(2, '0')}</span>
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
