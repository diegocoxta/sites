import { getUserCollection } from '~/lib/services/discogs';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function DiscogsWidget(props: RecentActivityType['props']) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getUserCollection({
    username: props.username,
    authorization: props.authorization,
  });

  return (
    data.releases.length && (
      <>
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
        <ul className={styles.grid}>
          {data.releases.map((release) => (
            <li className={styles.item} key={release.id}>
              <div
                className={styles.itemCover}
                style={{
                  backgroundImage: `url(${release.basic_information.cover_image})`,
                }}
                aria-hidden
              ></div>
              <p className={styles.itemTitle}>
                {release.basic_information.title} - {release.basic_information.artists[0].name}
              </p>
              <time dateTime={release.date_added} className={styles.itemDate}>
                Purchased in{' '}
                {new Date(release.date_added).toLocaleDateString('en', {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
