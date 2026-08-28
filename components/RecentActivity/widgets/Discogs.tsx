import { getUserCollection } from '~/lib/services/discogs';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function DiscogsWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getUserCollection({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.releases.length && (
      <>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
        <ul className={styles.grid}>
          {data.releases.map((release) => (
            <li className={styles.item} key={release.id}>
              <div
                className={styles.itemCover}
                style={{
                  backgroundImage: `url(${release.basic_information.cover_image})`,
                }}
                aria-hidden
              ></div>
              <p className={styles.itemTitle}>
                {release.basic_information.title} - {release.basic_information.artists[0].name}
              </p>
              <time dateTime={release.date_added} className={styles.itemDate}>
                {new Date(release.date_added).toLocaleDateString(lang, {
                  timeZone: 'UTC',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
