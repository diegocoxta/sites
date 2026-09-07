import { getMonthlyTopArtists } from '~/lib/services/lastfm';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function LastfmWidget({ t, config }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const { username, authorization } = config;
  const data = await getMonthlyTopArtists({ username, authorization });
  const artists = data?.topartists?.artist ?? [];

  if (artists.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={`${styles.list} ${styles.columns}`}>
        {artists.map((artist, index) => (
          <li key={artist.mbid || artist.name} className={`${styles.item} ${styles.columns}`}>
            <span className={styles.mark}>
              <span className={styles.markLabel}>{String(index + 1).padStart(2, '0')}</span>
            </span>
            <div>
              <p className={styles.itemTitle}>{artist.name}</p>
              <p className={styles.itemDescription}>
                {t('components.recentActivity.lastfm.plays', { count: artist.playcount })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
