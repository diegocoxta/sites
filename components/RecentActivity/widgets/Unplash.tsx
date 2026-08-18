import { getRecentUserPhotos } from '~/lib/services/unsplash';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function UnsplashWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getRecentUserPhotos({ username: props.username, authorization: props.authorization });

  return (
    data.photos.length > 0 && (
      <>
        <h3 className={styles.title}>Recent Photos</h3>
        <ul className={styles.container}>
          {data.photos.map((photo) => (
            <li className={styles.item} key={photo.id}>
              <div
                className={styles.itemCover}
                title={photo.alt_description}
                style={{
                  backgroundImage: `url(${photo.urls.small})`,
                  height: 190,
                }}
              ></div>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
