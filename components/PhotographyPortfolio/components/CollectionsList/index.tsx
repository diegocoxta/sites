import Image from 'next/image';
import Link from 'next/link';

import type { Translator } from '~/lib/i18n';

import type { CollectionSummary } from '../../types';
import Masonry from '../Masonry';
import styles from './styles.module.css';

interface CollectionsListProps {
  collections: CollectionSummary[];
  /** Rendered as the first masonry cell — the profile + collections tiles, same as every gallery page. */
  leading?: React.ReactElement;
  t: Translator;
}

function CoverCard({ collection, t }: { collection: CollectionSummary; t: Translator }): React.ReactElement {
  return (
    <Link className={styles.card} href={`/collections/${collection.id}`}>
      <div className={styles.cover}>
        {collection.coverSrc && (
          <Image src={collection.coverSrc} alt="" fill sizes="(max-width: 700px) 100vw, 320px" aria-hidden />
        )}
      </div>
      <div className={styles.meta}>
        <h2 className={styles.title}>{collection.title}</h2>
        <p className={styles.count}>{t('page.collections.photoCount', { count: collection.photoCount })}</p>
      </div>
    </Link>
  );
}

export default function CollectionsList({ collections, leading, t }: CollectionsListProps): React.ReactElement {
  return (
    <Masonry
      leading={leading}
      items={collections.map((collection) => ({
        id: collection.id,
        node: <CoverCard collection={collection} t={t} />,
      }))}
    />
  );
}
