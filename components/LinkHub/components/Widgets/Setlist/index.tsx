//@TODO refactor

import { getUserConcertsAttendance } from '~/lib/services/setlist';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function SetlistWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserConcertsAttendance({
    username: config.username,
    authorization: config.authorization,
  });

  const concerts = data?.setlist ?? [];

  if (concerts.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="list">
      {concerts.map((entry) => {
        const date = entry.eventDate.split('-').reverse().join('-');

        return (
          <RecentActivity.Item key={entry.id} className={styles.row}>
            <span className={styles.mark}>
              <span className={styles.markLabel}>{t.date(date, { day: '2-digit' })}</span>
              <span className={styles.markSub}>{t.date(date, { month: 'short' }).replace('.', '')}</span>
            </span>
            <div>
              <p className={styles.itemTitle}>
                {entry.tour?.name ? `${entry.tour.name} — ${entry.artist.name}` : entry.artist.name}
              </p>
              <p className={styles.itemDescription}>{`${entry.venue.city.name} — ${entry.venue.city.country.code}`}</p>
            </div>
          </RecentActivity.Item>
        );
      })}
    </RecentActivity>
  );
}
