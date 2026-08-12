import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';

import {
  formatDate,
  getDiscogsActivity,
  getHardcoverActivity,
  getLetterboxdActivity,
  getUnsplashActivity,
} from '~/lib/services';

import styles from './styles.module.css';

export async function DiscogsRecentActivity() {
  const data = await getDiscogsActivity();

  return (
    <div className={styles.container}>
      {data.releases.slice(0, 3).map((release) => (
        <div className={styles.item} key={release.id}>
          <Image
            src={release.basic_information.cover_image}
            width={190}
            height={190}
            alt={release.basic_information.title}
            className={styles.cover}
            loading="eager"
          />
          <p className={styles.title}>
            {release.basic_information.title} - {release.basic_information.artists[0].name}
          </p>
          <p className={styles.date}>Purchased in {formatDate(release.date_added)}</p>
        </div>
      ))}
    </div>
  );
}

export async function HardcoverRecentActivity() {
  const data = await getHardcoverActivity();

  return (
    <div className={styles.container}>
      {data.books?.slice(0, 3).map((book) => (
        <div className={styles.item} key={book.id}>
          {book.image ? (
            <Image
              src={book.image}
              width={190}
              height={190}
              alt={book.title}
              className={styles.cover}
              loading="eager"
            />
          ) : (
            <div className={`${styles.cover} ${styles.empty}`}>Without cover</div>
          )}
          <p className={styles.title}>{book.title}</p>
          <p className={styles.date}>
            Page {book.progress_pages || '0'} / {book.pages}
          </p>
        </div>
      ))}
    </div>
  );
}

export async function LetterboxdRecentActivity() {
  const data = await getLetterboxdActivity();

  return (
    <div className={styles.container}>
      {data.items.slice(0, 3).map((movie) => (
        <div className={styles.release} key={movie.pubDate}>
          <Image
            src={movie.cover}
            width={190}
            height={190}
            alt={movie.title}
            className={styles.cover}
            loading="eager"
          />
          <p className={styles.title}>
            {movie.memberLike === 'Yes' && <FaHeart className={styles.like} />} {movie.title}
          </p>
          <p className={styles.date}>Watched in {formatDate(movie.watchedDate)}</p>
        </div>
      ))}
    </div>
  );
}

export async function UnsplashRecentActivity() {
  const data = await getUnsplashActivity(3);

  return (
    <div className={styles.container}>
      {data.photos.map((photo) => (
        <div className={styles.item} key={photo.id}>
          <Image
            src={photo.urls.thumb}
            width={190}
            height={190}
            alt={photo.alt_description}
            className={styles.cover}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
