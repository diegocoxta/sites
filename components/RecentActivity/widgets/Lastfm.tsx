import { getMonthlyTopArtists } from '~/lib/services/lastfm';
import { findArtistPhoto } from '~/lib/services/deezer';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

type Artist = Awaited<ReturnType<typeof getMonthlyTopArtists>>['topartists']['artist'][number];

async function ArtistItem({ artist, t }: { artist: Artist; t: RecentActivityProps['t'] }) {
  const imageSrc = await findArtistPhoto({ name: artist.name });

  return (
    <li className={styles.item}>
      <div
        className={styles.itemCover}
        style={{
          backgroundImage: `url(${imageSrc || artist.image?.[2]?.['#text'] || undefined})`,
        }}
        aria-hidden
      ></div>
      <p className={styles.itemTitle}>{artist.name}</p>
      <p className={styles.itemDescription}>
        {t('components.recentActivity.lastfm.plays', { count: artist.playcount })}
      </p>
    </li>
  );
}

export default async function LastfmWidget({ config, t }: RecentActivityProps) {
  if (!config.username || !config.authorization) {
    return <></>;
  }

  const data = await getMonthlyTopArtists({
    username: config.username.toString(),
    authorization: config.authorization.toString(),
  });

  return (
    data.topartists?.artist?.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
        <ul className={styles.grid}>
          {data.topartists.artist.map((artist, index) => (
            <ArtistItem key={index} artist={artist} t={t} />
          ))}
        </ul>
      </>
    )
  );
}
