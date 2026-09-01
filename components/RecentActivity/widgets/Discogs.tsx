import { getUserCollection } from '~/lib/services/discogs';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function DiscogsWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getUserCollection({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.releases?.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
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
                {release.basic_information.title} - {release.basic_information.artists?.[0]?.name}
              </p>
              <time dateTime={release.date_added} className={styles.itemDate}>
                {t.date(release.date_added, { month: 'long', year: 'numeric' })}
              </time>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
