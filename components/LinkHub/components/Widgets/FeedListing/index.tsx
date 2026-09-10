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
          <p className={styles.title}>{item.title}</p>
          <p className={styles.description}>{item.description}</p>
        </RecentActivity.Item>
      ))}
    </RecentActivity>
  );
}
