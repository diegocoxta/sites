import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import styles from './styles.module.css';

type CollectionDetailsProps = ComponentWithTranslator<{
  /** The collection's number, counted from the total down (newest = highest) — the "Collection 11" kicker. */
  index: number;
  title: string;
  description?: string | null;
  photoCount: number;
  /** ISO date; only the year is shown. */
  publishedAt?: string | null;
}>;

/**
 * The "you are here" card on a single collection page — sits between the profile tile and
 * the collections shortlist, naming the collection currently on screen.
 */
export default function CollectionDetails({
  t,
  index,
  title,
  description,
  photoCount,
  publishedAt,
}: CollectionDetailsProps): React.ReactElement {
  return (
    <section className={styles.card}>
      <p className={styles.kicker}>{t('page.collections.number', { number: String(index).padStart(2, '0') })}</p>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.meta}>
        <span>{t('page.collections.photoCount', { count: photoCount })}</span>
        {publishedAt && <span>{t.date(publishedAt, { year: 'numeric' })}</span>}
      </p>
    </section>
  );
}
