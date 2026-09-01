import { getRecentUserPhotos } from '~/lib/services/unsplash';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function UnsplashWidget({ config, t }: RecentActivityProps) {
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
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
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
