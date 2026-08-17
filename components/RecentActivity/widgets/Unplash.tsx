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
      next: { revalidate: 3600 },
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
  );
}
