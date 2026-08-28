import { getFeedListing } from '~/lib/services/feed';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function FeedListing(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.feed) {
    return <></>;
  }

  const data = await getFeedListing({
    feed: config.feed.toString(),
  });

  return (
    data && (
      <div aria-hidden>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
        <ul className={styles.list}>
          {data.items.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.item}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
              <p className={styles.itemDate}>
                {new Date(item.pubDate).toLocaleDateString(lang, {
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
