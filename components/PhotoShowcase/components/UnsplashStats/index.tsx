import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import { getStatistics } from '~/app/diegocosta.me/actions';

import styles from './styles.module.css';

export default async function UnsplashStats({ t }: ComponentWithTranslator) {
  const statistics = await getStatistics();

  if (!statistics) {
    return null;
  }

  const format = new Intl.NumberFormat(t.locale);

  return (
    <dl className={styles.stats}>
      <div className={styles.stat}>
        <dt className={styles.label}>{t('components.photoshowcase.unsplashstats.downloads')}</dt>
        <dd className={styles.value}>{format.format(statistics.downloads)}</dd>
      </div>
      <div className={styles.stat}>
        <dt className={styles.label}>{t('components.photoshowcase.unsplashstats.views')}</dt>
        <dd className={styles.value}>{format.format(statistics.views)}</dd>
      </div>
    </dl>
  );
}
