import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';

import { getRecentlyWatchedMovies } from '~/lib/services/letterboxd';

import type { RecentActivityProps } from '../index';
import styles from '../styles.module.css';

export default async function LetterboxdWidget(props: RecentActivityProps) {
  if (!props.username) {
    return <></>;
  }

  const data = await getRecentlyWatchedMovies({ username: props.username });

  return (
    data.movies.length > 0 && (
      <>
        <h3 className={styles.title}>Recently Watched Movies</h3>
        <ul className={styles.container}>
          {data.movies.map((movie) => (
            <li className={styles.item} key={movie.pubDate}>
              <Image src={movie.cover} width={190} height={190} alt={movie.title} className={styles.itemCover} />
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
