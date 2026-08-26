import { getContributionsCalendar } from '~/lib/services/github';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function GithubWidget(props: RecentActivityType['props']) {
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
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
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
