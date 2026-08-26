import { getFeedListing } from '~/lib/services/feed';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function FeedListing(props: RecentActivityType['props']) {
  if (!props.feed) {
    return <></>;
  }

  const data = await getFeedListing({
    feed: props.feed,
  });

  return (
    data && (
      <div aria-hidden>
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
        <ul className={styles.list}>
          {data.items.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.item}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
              <p className={styles.itemDate}>
                {new Date(item.pubDate).toLocaleDateString('en', {
                  timeZone: 'UTC',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
