import { getUserConcertsAttendance } from '~/lib/services/setlist';
import { findArtistPhoto } from '~/lib/services/deezer';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function SetlistWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getUserConcertsAttendance({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.setlist.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
        <ul className={styles.grid}>
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
                  {new Date(setlist.eventDate.split('-').reverse().join('-')).toLocaleDateString(lang, {
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
