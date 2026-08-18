import Image from 'next/image';

import { getMonthlyTopArtists } from '~/lib/services/lastfm';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function LastfmWidget(props: RecentActivityProps) {
  if (!props.username || !props.authorization) {
    return <></>;
  }

  const data = await getMonthlyTopArtists({
    username: props.username,
    authorization: props.authorization,
  });

  return (
    data.topartists.artist.length > 0 && (
      <>
        <h3 className={styles.title}>Monthly Top Artists</h3>
        <ul className={styles.container}>
          {data.topartists.artist.map(async (artist) => {
            const imageSrc = await findArtistPhoto({ name: artist.name });

            return (
              <li className={styles.item} key={artist.mbid}>
                <Image
                  src={imageSrc || artist.image[2]['#text']}
                  width={190}
                  height={190}
                  alt={artist.name}
                  className={styles.itemCover}
                />
                <p className={styles.itemTitle}>{artist.name}</p>
                <p className={styles.itemDescription}>{artist.playcount} plays</p>
              </li>
            );
          })}
        </ul>
      </>
    )
  );
}
