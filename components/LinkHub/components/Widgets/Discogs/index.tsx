import Image from 'next/image';

import { getUserCollection } from '~/lib/services/discogs';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function DiscogsWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username || !config.authorization) {
    return null;
  }

  const data = await getUserCollection({
    username: config.username,
    authorization: config.authorization,
    per_page: 2,
  });

  const releases = data?.releases ?? [];

  if (releases.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="grid" gridColumns={2}>
      {releases.map((release) => (
        <RecentActivity.Item key={release.id}>
          {release.basic_information.cover_image && (
            <div className={styles.container}>
              <div className={styles.sleeve}>
                {release.basic_information.title && (
                  <Image
                    src={release.basic_information.cover_image}
                    alt={release.basic_information.title}
                    fill
                    sizes="(max-width: 575px) 40vw, 160px"
                    className={styles.sleeveImage}
                    fetchPriority="high"
                  />
                )}
              </div>
              <div className={styles.record}>
                <div className={styles.disc}>
                  <div className={styles.branding}>
                    {release.basic_information.cover_image && (
                      <Image
                        src={release.basic_information.cover_image}
                        alt=""
                        fill
                        sizes="48px"
                        className={styles.cover}
                      />
                    )}
                    <div className={styles.hole} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className={styles.title}>{release.basic_information.title}</p>
          <p className={styles.description}>{release.basic_information.artists?.[0]?.name}</p>
        </RecentActivity.Item>
      ))}
    </RecentActivity>
  );
}
