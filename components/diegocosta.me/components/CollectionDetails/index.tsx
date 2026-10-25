import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

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
      {<p className={styles.description}>{description || t('page.collections.description')}</p>}
      <p className={styles.meta}>
        <span>{t('components.photoshowcase.collectiondetails.photocount', { count: photoCount })}</span>
        {publishedAt && <span>{t.date(publishedAt, { year: 'numeric' })}</span>}
      </p>
      <Link className={styles.cta} href="/">
        <FaArrowLeftLong /> {t('components.photoshowcase.collectiondetails.allphotos')}
      </Link>
    </section>
  );
}
