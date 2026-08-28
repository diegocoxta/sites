import { getRecentUserPhotos } from '~/lib/services/unsplash';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function UnsplashWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getRecentUserPhotos({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.photos.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
        <ul className={styles.grid}>
          {data.photos.map((photo) => (
            <li className={styles.item} key={photo.id}>
              <div
                className={styles.itemCover}
                style={{
                  backgroundImage: `url(${photo.urls.small})`,
                }}
                aria-hidden
              ></div>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
