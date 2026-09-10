//@TODO refactor

import { getFeedListing } from '~/lib/services/feed';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function FeedListing({ t, config }: RecentActivityWidgetProps) {
  if (!config.feed) {
    return null;
  }

  const items = (await getFeedListing({ feed: config.feed })) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="list">
      {items.map((item, itemIndex) => (
        <RecentActivity.Item key={itemIndex} className={styles.row}>
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
        </RecentActivity.Item>
      ))}
    </RecentActivity>
  );
}
