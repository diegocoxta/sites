import Link from 'next/link';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import styles from './styles.module.css';

type CollectionDetailsProps = ComponentWithTranslator<{
  title: string;
  description?: string | null;
  photoCount: number;
  publishedAt?: string | null;
}>;

export default function CollectionDetails({ t, title, description, photoCount, publishedAt }: CollectionDetailsProps) {
  return (
    <section className={styles.card}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.meta}>
        <span>{t('components.photoShowcase.collectionDetails.photoCount', { count: photoCount })}</span>
        {publishedAt && <span>{t.date(publishedAt, { year: 'numeric' })}</span>}
      </p>
      <Link className={styles.cta} href="/">
        {t('components.photoShowcase.collectionDetails.allPhotos')}
      </Link>
    </section>
  );
}
