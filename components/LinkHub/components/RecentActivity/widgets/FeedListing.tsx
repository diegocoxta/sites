import { getFeedListing } from '~/lib/services/feed';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function FeedListing({ t, config }: RecentActivityProps) {
  if (!config.feed) {
    return null;
  }

  const items = await getFeedListing({ feed: config.feed });

  if (items?.length === 0) {
    return null;
  }

  return (
    <div>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={`${styles.list} ${styles.columns}`}>
        {items?.map((item, itemIndex) => (
          <li key={itemIndex} className={styles.item}>
            <span className={styles.mark}>
              <span className={styles.markLabel}>{t.date(item.pubDate, { day: '2-digit' })}</span>
              <span className={styles.markSub}>
                {t.date(item.pubDate, { month: 'short', year: 'numeric' }).replace('.', '')}
              </span>
            </span>
            <div>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
