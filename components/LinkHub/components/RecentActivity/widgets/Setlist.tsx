import Image from 'next/image';

import { getUserConcertsAttendance } from '~/lib/services/setlist';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function SetlistWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserConcertsAttendance({
    username: config.username,
    authorization: config.authorization,
  });

  if (data?.setlist.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={styles.grid}>
        {data?.setlist.slice(0, 3).map(async (setlist) => {
          const imageSrc = await findArtistPhoto({ name: setlist.artist.name });

          return (
            <li key={setlist.id} className={styles.item}>
              <div className={styles.itemCover} aria-hidden>
                {imageSrc && <Image src={imageSrc} alt="" fill sizes="120px" />}
              </div>
              <p className={styles.itemTitle}>{setlist.artist.name}</p>
              <p className={styles.itemDescription}>{setlist.tour.name}</p>
              <p className={styles.itemDescription}>
                {setlist.venue.city.name} - {setlist.venue.city.country.name}
              </p>
              <p className={styles.itemDescription}>
                {t.date(setlist.eventDate.split('-').reverse().join('-'), {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
