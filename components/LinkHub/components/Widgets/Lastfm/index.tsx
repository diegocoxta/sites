import { FaPlay } from 'react-icons/fa6';

import { getMonthlyScrobbles, getMonthlyTopArtists } from '~/lib/services/lastfm';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import NowPlaying from './NowPlaying';

import styles from './styles.module.css';

export default async function LastfmWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const { username, authorization } = config;

  const [data, monthlyScrobbles] = await Promise.all([
    getMonthlyTopArtists({ username, authorization }),
    getMonthlyScrobbles({ username, authorization }),
  ]);

  const artists = data?.topartists?.artist ?? [];

  if (artists.length === 0) {
    return null;
  }

  const totalPlays = monthlyScrobbles ?? artists.reduce((sum, artist) => sum + Number(artist.playcount), 0);

  return (
    <>
      <NowPlaying />
      <RecentActivity title={config.title && t(config.title)}>
        {artists.map((artist, index) => (
          <RecentActivity.Item key={artist.mbid || artist.name} className={styles.row}>
            <span className={styles.rank}>
              <FaPlay className={styles.rankIcon} />
              <span className={styles.rankLabel}>{String(index + 1).padStart(2, '0')}</span>
            </span>
            <div className={styles.info}>
              <p className={styles.artist}>{artist.name}</p>
              <div className={styles.bar}>
                <span
                  className={styles.barFill}
                  style={{ width: totalPlays > 0 ? `${(Number(artist.playcount) / totalPlays) * 100}%` : 0 }}
                />
              </div>
            </div>
            <p className={styles.plays}>
              {t('components.linkhub.recentactivity.lastfm.plays', { count: artist.playcount })}
            </p>
          </RecentActivity.Item>
        ))}
      </RecentActivity>
    </>
  );
}
