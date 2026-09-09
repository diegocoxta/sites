import { getUserCollection } from '~/lib/services/discogs';

import VinylRecord from '../../VinylRecord';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function DiscogsWidget({ t, config }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserCollection({
    username: config.username,
    authorization: config.authorization,
    per_page: 2,
  });

  if (!data || data?.releases?.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={styles.grid}>
        {data?.releases.map((release) => (
          <li className={styles.item} key={release.id}>
            {release.basic_information.cover_image && (
              <VinylRecord coverSrc={release.basic_information.cover_image} title={release.basic_information.title} />
            )}
            <p className={styles.itemTitle}>
              {release.basic_information.title}
            </p>
            <time dateTime={release.date_added} className={styles.itemDate}>
              {release.basic_information.artists?.[0]?.name}
            </time>
          </li>
        ))}
      </ul>
    </>
  );
}
