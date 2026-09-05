import { getContributionsCalendar } from '~/lib/services/github';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function GithubWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getContributionsCalendar({
    username: config.username,
    authorization: config.authorization,
  });

  if (!data) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <div className={styles.githubRecentActivity} aria-hidden>
        <div className={styles.scrollWrapper}>
          <div className={styles.graph}>
            {data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.weekColumn}>
                {week.contributionDays?.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={styles.day}
                    style={{ backgroundColor: day.contributionCount > 0 ? day.color : undefined }}
                    data-count={day.contributionCount}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
