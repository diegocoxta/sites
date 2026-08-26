import { getContributionsCalendar } from '~/lib/services/github';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function GithubWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getContributionsCalendar({
    username: props.username,
    authorization: props.authorization,
  });

  return (
    data && (
      <div aria-hidden>
        <h3 className={styles.title}>Contribution Activity</h3>
        <div className={styles.githubRecentActivity}>
          <div className={styles.scrollWrapper}>
            <div className={styles.graph}>
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className={styles.weekColumn}>
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={styles.day}
                      style={{ backgroundColor: day.contributionCount > 0 ? day.color : undefined }}
                      data-count={day.contributionCount}
                      title={`${day.contributionCount} contribuições em ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
