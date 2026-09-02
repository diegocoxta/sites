import Image from 'next/image';

import { getRecentUserPhotos } from '~/lib/services/unsplash';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function UnsplashWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getRecentUserPhotos({
    username: config.username,
    authorization: config.authorization,
  });

  if (data?.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={styles.grid}>
        {data?.map((photo) => (
          <li className={styles.item} key={photo.id}>
            <div className={styles.itemCover} aria-hidden>
              <Image src={photo.urls.small} alt={photo.alt_description ?? ''} fill sizes="120px" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
