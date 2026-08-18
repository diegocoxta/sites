import Image from 'next/image';

import { getUserCollection } from '~/lib/services/discogs';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function DiscogsWidget(props: RecentActivityProps) {
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
        <h3 className={styles.title}>Last Records Purchased</h3>
        <ul className={styles.container}>
          {data.releases.map((release) => (
            <li className={styles.item} key={release.id}>
              <Image
                src={release.basic_information.cover_image}
                width={190}
                height={190}
                alt={release.basic_information.title}
                className={styles.itemCover}
              />
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
