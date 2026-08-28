import { FaHeart } from 'react-icons/fa6';

import { getRecentlyWatchedMovies } from '~/lib/services/letterboxd';
import type { RecentActivityType } from '~/lib/config';
import { getLocatedString } from '~/lib/lang';

import styles from '../styles.module.css';

export default async function LetterboxdWidget(props: Pick<RecentActivityType, 'config' | 'lang'>) {
  const { config, lang } = props;

  if (!config.username) {
    return <></>;
  }

  const data = await getRecentlyWatchedMovies({ username: config.username.toString() });

  return (
    data.movies.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{getLocatedString(config.title, lang)}</h3>}
        <ul className={styles.grid}>
          {data.movies.map((movie) => (
            <li className={styles.item} key={movie.pubDate}>
              <div
                className={styles.itemCover}
                style={{
                  backgroundImage: `url(${movie.cover})`,
                  height: 190,
                }}
                aria-hidden
              ></div>
              <h4 className={styles.itemTitle}>
                {movie.memberLike === 'Yes' && <FaHeart className={styles.itemLike} />} {movie.title}
              </h4>
              {movie.stars > 0 && <p className={styles.itemDescription}>{'★'.repeat(movie.stars)}</p>}
              <time dateTime={movie.watchedDate} className={styles.itemDate}>
                {new Date(movie.watchedDate).toLocaleDateString(lang, {
                  timeZone: 'UTC',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
