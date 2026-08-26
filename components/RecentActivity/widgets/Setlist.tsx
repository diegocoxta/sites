import Image from 'next/image';

import { getUserConcertsAttendance } from '~/lib/services/setlist';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function SetlistWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getUserConcertsAttendance({
    username: props.username,
    authorization: props.authorization,
  });

  return (
    data.setlist.length > 0 && (
      <>
        <h3 className={styles.title}>Latest attended concerts</h3>
        <ul className={styles.container}>
          {data.setlist.slice(0, 3).map(async (setlist) => {
            const imageSrc = await findArtistPhoto({ name: setlist.artist.name });

            return (
              <li className={styles.item} key={setlist.id}>
                <div
                  className={styles.itemCover}
                  style={{
                    backgroundImage: `url(${imageSrc || ''})`,
                  }}
                  aria-hidden
                ></div>
                <p className={styles.itemTitle}>{setlist.artist.name}</p>
                <p className={styles.itemDescription}>{setlist.tour.name}</p>
                <p className={styles.itemDescription}>
                  {setlist.venue.city.name} - {setlist.venue.city.country.name}
                </p>
                <p className={styles.itemDescription}>
                  {new Date(setlist.eventDate.split('-').reverse().join('-')).toLocaleDateString('en', {
                    timeZone: 'UTC',
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
    )
  );
}
