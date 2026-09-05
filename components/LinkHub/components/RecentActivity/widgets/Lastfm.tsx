import Image from 'next/image';

import { getMonthlyTopArtists } from '~/lib/services/lastfm';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function LastfmWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getMonthlyTopArtists({
    username: config.username,
    authorization: config.authorization,
  });

  if (data?.topartists.artist.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={styles.grid}>
        {data?.topartists.artist.map(async (artist) => {
          const imageSrc = (await findArtistPhoto({ name: artist.name })) || artist.image?.[2]?.['#text'] || null;

          return (
            <li className={styles.item} key={artist.mbid || artist.name}>
              <div className={styles.itemCover} aria-hidden>
                {imageSrc && <Image src={imageSrc} alt="" fill sizes="120px" />}
              </div>
              <p className={styles.itemTitle}>{artist.name}</p>
              <p className={styles.itemDescription}>
                {t('components.recentActivity.lastfm.plays', { count: artist.playcount })}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
