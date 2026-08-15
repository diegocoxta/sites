import Image from 'next/image';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

interface DiscogsResponseType {
  releases: Array<{
    id: string;
    date_added: string;
    basic_information: {
      cover_image: string;
      title: string;
      artists: Array<{
        name: string;
      }>;
    };
  }>;
}

async function getActivity(username: string, token: string): Promise<DiscogsResponseType> {
  try {
    const request = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc`,
      {
        headers: {
          Authorization: `Discogs token=${token}`,
        },
        next: { revalidate: 3600, tags: ['discogs'] },
      }
    );

    const data = await request.json();

    return data as DiscogsResponseType;
  } catch (error) {
    console.error(error);
    return {} as DiscogsResponseType;
  }
}

export default async function DiscogsWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getActivity(props.username, props.authorization);

  return (
    <>
      <p className={styles.title}>Last Records Purchased</p>
      <div className={styles.container}>
        {data.releases.slice(0, 3).map((release) => (
          <div className={styles.item} key={release.id}>
            <Image
              src={release.basic_information.cover_image}
              width={190}
              height={190}
              alt={release.basic_information.title}
              className={styles.itemCover}
              loading="eager"
            />
            <p className={styles.itemTitle}>
              {release.basic_information.title} - {release.basic_information.artists[0].name}
            </p>
            <p className={styles.itemDate}>
              Purchased in{' '}
              {new Date(release.date_added).toLocaleDateString('en', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
