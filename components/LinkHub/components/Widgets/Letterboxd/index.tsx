import Image from 'next/image';
import { FaHeart, FaPlay } from 'react-icons/fa6';

import { getRecentlyWatchedMovies } from '~/lib/services/letterboxd';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function LetterboxdWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.username) {
    return null;
  }

  const movies = (await getRecentlyWatchedMovies({ username: config.username })) ?? [];

  if (movies.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="grid">
      {movies.map((movie) => (
        <RecentActivity.Item key={movie.pubDate}>
          <div className={styles.cover} aria-hidden>
            {movie.cover && <Image src={movie.cover} alt="" fill sizes="(max-width: 575px) 30vw, 140px" />}
            <FaPlay />
          </div>
          <h4 className={styles.title}>
            {movie.memberLike === 'Yes' && <FaHeart className={styles.like} />} {movie.title}
          </h4>
          {movie.stars > 0 && <p className={styles.description}>{'★'.repeat(movie.stars)}</p>}
          <time dateTime={movie.watchedDate} className={styles.date}>
            {t.date(movie.watchedDate, { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </RecentActivity.Item>
      ))}
    </RecentActivity>
  );
}
