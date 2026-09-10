//@TODO refactor

import Image from 'next/image';

import { getRecentUserPhotos } from '~/lib/services/unsplash';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function UnsplashWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const photos =
    (await getRecentUserPhotos({
      username: config.username,
      authorization: config.authorization,
      per_page: 3,
    })) ?? [];

  if (photos.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="grid">
      {photos.map((photo) => (
        <RecentActivity.Item key={photo.id}>
          <div className={styles.photo} aria-hidden>
            <Image src={photo.urls.small} alt={photo.alt_description ?? ''} fill sizes="120px" />
          </div>
        </RecentActivity.Item>
      ))}
    </RecentActivity>
  );
}
