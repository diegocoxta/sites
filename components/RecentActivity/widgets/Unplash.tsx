import { getRecentUserPhotos } from '~/lib/services/unsplash';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function UnsplashWidget(props: RecentActivityType['props']) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getRecentUserPhotos({ username: props.username, authorization: props.authorization });

  return (
    data.photos.length > 0 && (
      <>
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
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
