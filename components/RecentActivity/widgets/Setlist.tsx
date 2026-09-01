import { getUserConcertsAttendance } from '~/lib/services/setlist';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

type Setlist = Awaited<ReturnType<typeof getUserConcertsAttendance>>['setlist'][number];

async function SetlistItem({ setlist, t }: { setlist: Setlist; t: RecentActivityProps['t'] }) {
  const imageSrc = await findArtistPhoto({ name: setlist.artist.name });

  return (
    <li className={styles.item}>
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
        {t.date(setlist.eventDate.split('-').reverse().join('-'), {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </li>
  );
}

export default async function SetlistWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getUserConcertsAttendance({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.setlist?.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
        <ul className={styles.grid}>
          {data.setlist.slice(0, 3).map((setlist) => (
            <SetlistItem key={setlist.id} setlist={setlist} t={t} />
          ))}
        </ul>
      </>
    )
  );
}
