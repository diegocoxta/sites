import Image from 'next/image';

import { getUserCollection } from '~/lib/services/discogs';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function DiscogsWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserCollection({
    username: config.username,
    authorization: config.authorization,
  });

  if (data?.releases.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={styles.grid}>
        {data?.releases.map((release) => (
          <li className={styles.item} key={release.id}>
            <div className={styles.itemCover} aria-hidden>
              {release.basic_information.cover_image && (
                <Image src={release.basic_information.cover_image} alt="" fill sizes="120px" />
              )}
            </div>
            <p className={styles.itemTitle}>
              {release.basic_information.title} - {release.basic_information.artists?.[0]?.name}
            </p>
            <time dateTime={release.date_added} className={styles.itemDate}>
              {t.date(release.date_added, { month: 'long', year: 'numeric' })}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
}
