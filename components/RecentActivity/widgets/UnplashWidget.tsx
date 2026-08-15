import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

interface UnsplashResponseType {
  photos: Array<{
    id: string;
    created_at: string;
    alt_description: string;
    urls: {
      small: string;
    };
  }>;
}

export async function getActivity(username: string, authorization: string): Promise<UnsplashResponseType> {
  try {
    const request = await fetch(`https://api.unsplash.com/users/${username}/photos?per_page=3`, {
      headers: {
        Authorization: `Client-ID ${authorization}`,
      },
      next: { revalidate: 3600, tags: ['unsplash'] },
    });

    const data = await request.json();

    return { photos: data } as UnsplashResponseType;
  } catch (error) {
    console.error(error);
    return {} as UnsplashResponseType;
  }
}

export default async function UnsplashWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getActivity(props.username, props.authorization);

  return (
    <>
      <p className={styles.title}>Recent Photos</p>
      <div className={styles.container}>
        {data.photos.map((photo) => (
          <div className={styles.item} key={photo.id}>
            <div
              className={styles.itemCover}
              style={{
                backgroundImage: `url(${photo.urls.small})`,
                height: 190,
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}
