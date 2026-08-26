import { FaHeart } from 'react-icons/fa6';

import { getRecentlyWatchedMovies } from '~/lib/services/letterboxd';
import type { RecentActivityType } from '~/lib/config';

import styles from '../styles.module.css';

export default async function LetterboxdWidget(props: RecentActivityType['props']) {
  if (!props.username) {
    return <></>;
  }

  const data = await getRecentlyWatchedMovies({ username: props.username });

  return (
    data.movies.length > 0 && (
      <>
        {props.title && <h3 className={styles.title}>{props.title}</h3>}
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
                Watched in{' '}
                {new Date(movie.watchedDate).toLocaleDateString('en', {
                  timeZone: 'UTC',
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
