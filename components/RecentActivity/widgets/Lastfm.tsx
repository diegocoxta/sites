import Image from 'next/image';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

interface LastfmResponseType {
  topartists: {
    artist: Array<{
      streamable: string;
      image: Array<{
        size: string;
        '#text': string;
      }>;
      mbid: string;
      url: string;
      playcount: string;
      '@attr': {
        rank: string;
      };
      name: string;
    }>;
  };
}

async function getArtistPhoto(artist: string) {
  try {
    const url = new URL('https://api.deezer.com/search/artist');
    url.searchParams.append('q', artist);

    const response = await fetch(url.toString(), {
      next: { revalidate: 604800, tags: [`deezer-${artist}`] },
    });

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      return data.data[0].picture_medium;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getActivity(username: string, token: string): Promise<LastfmResponseType> {
  try {
    const request = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${token}&format=json&period=1month&limit=3`,
      {
        next: { revalidate: 3600, tags: ['lastfm'] },
      }
    );

    const data = await request.json();

    return data as LastfmResponseType;
  } catch (error) {
    console.error(error);
    return {} as LastfmResponseType;
  }
}

export default async function LastfmWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getActivity(props.username, props.authorization);

  return (
    <>
      <h3 className={styles.title}>Monthly Favorites</h3>
      <ul className={styles.container}>
        {data.topartists.artist.slice(0, 3).map(async (artist) => {
          const imageSrc = await getArtistPhoto(artist.name);

          return (
            <li className={styles.item} key={artist.mbid}>
              <Image
                src={imageSrc}
                width={190}
                height={190}
                alt={artist.name}
                className={styles.itemCover}
                loading="eager"
              />
              <p className={styles.itemTitle}>{artist.name}</p>
              <p className={styles.itemDescription}>{artist.playcount} plays</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
