import { getMonthlyTopArtists } from '~/lib/services/lastfm';
import { findArtistPhoto } from '~/lib/services/deezer';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function LastfmWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getMonthlyTopArtists({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.topartists.artist.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
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
