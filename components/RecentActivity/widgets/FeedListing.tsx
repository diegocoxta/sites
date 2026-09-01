import { getFeedListing } from '~/lib/services/feed';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function FeedListing({ config, t }: RecentActivityProps) {
  if (!config.feed) {
    return <></>;
  }

  const data = await getFeedListing({
    feed: config.feed.toString(),
  });

  return (
    data && (
      <div aria-hidden>
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
        <ul className={styles.list}>
          {data.items.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.item}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
              <p className={styles.itemDate}>
                {t.date(item.pubDate, { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
