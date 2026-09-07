import { getUserConcertsAttendance } from '~/lib/services/setlist';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function SetlistWidget({ t, config }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserConcertsAttendance({
    username: config.username,
    authorization: config.authorization,
  });

  const concerts = data?.setlist?.slice(0, 3) ?? [];

  if (concerts.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={`${styles.list} ${styles.columns}`}>
        {concerts.map((entry) => {
          const date = entry.eventDate.split('-').reverse().join('-');

          return (
            <li key={entry.id} className={`${styles.item} ${styles.columns}`}>
              <span className={styles.mark}>
                <span className={styles.markLabel}>{t.date(date, { day: '2-digit' })}</span>
                <span className={styles.markSub}>{t.date(date, { month: 'short' }).replace('.', '')}</span>
              </span>
              <div>
                <p className={styles.itemTitle}>
                  {entry.tour?.name ? `${entry.tour.name} — ${entry.artist.name}` : entry.artist.name}
                </p>
                <p
                  className={styles.itemDescription}
                >{`${entry.venue.city.name} — ${entry.venue.city.country.code}`}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
