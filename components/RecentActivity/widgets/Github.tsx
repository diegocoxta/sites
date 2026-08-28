import { getContributionsCalendar } from '~/lib/services/github';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function GithubWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getContributionsCalendar({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data && (
      <div aria-hidden>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title)}</h3>}
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
