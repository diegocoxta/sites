import Link from 'next/link';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import type { Collection } from '../../types';

import styles from './styles.module.css';

type CollectionsCardProps = ComponentWithTranslator<{
  collections: Collection[];
}>;

export default function CollectionsCard({ t, collections }: CollectionsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.kicker}>{t('components.photoShowcase.collectionsCard.title')}</div>
      <ul className={styles.list}>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link className={styles.item} href={`/c/${collection.id}`}>
              <span className={styles.name}>{collection.title}</span>
              <span className={styles.count}>{collection.photoCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
