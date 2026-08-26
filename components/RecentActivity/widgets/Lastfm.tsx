import { getMonthlyTopArtists } from '~/lib/services/lastfm';
import { findArtistPhoto } from '~/lib/services/deezer';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function LastfmWidget(props: RecentActivityType['props']) {
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
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
        <ul className={styles.grid}>
          {data.topartists.artist.map(async (artist) => {
            const imageSrc = await findArtistPhoto({ name: artist.name });

            return (
              <li className={styles.item} key={artist.mbid}>
                <div
                  className={styles.itemCover}
                  style={{
                    backgroundImage: `url(${imageSrc || artist.image[2]['#text']})`,
                  }}
                  aria-hidden
                ></div>
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
