import { getContributionsCalendar } from '~/lib/services/github';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function GithubWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getContributionsCalendar({
    username: config.username,
    authorization: config.authorization,
  });

  const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  if (weeks.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)}>
      <div className={styles.container} aria-hidden>
        <div className={styles.wrapper}>
          <div className={styles.graph}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className={styles.week}>
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
    </RecentActivity>
  );
}
