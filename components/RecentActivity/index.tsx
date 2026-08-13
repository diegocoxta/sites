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
    <>
      <p className={styles.title}>Last Records Purchased</p>
      <div className={styles.container}>
        {data.releases.slice(0, 3).map((release) => (
          <div className={styles.item} key={release.id}>
            <Image
              src={release.basic_information.cover_image}
              width={190}
              height={190}
              alt={release.basic_information.title}
              className={styles.itemCover}
              loading="eager"
            />
            <p className={styles.itemTitle}>
              {release.basic_information.title} - {release.basic_information.artists[0].name}
            </p>
            <p className={styles.itemDate}>Purchased in {formatDate(release.date_added)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function HardcoverRecentActivity() {
  const data = await getHardcoverActivity();

  return (
    <>
      <p className={styles.title}>Currently Reading</p>
      <div className={styles.container}>
        {data.books && data.books?.length > 0
          ? data.books?.slice(0, 3).map((book) => (
              <div className={styles.item} key={book.id}>
                {book.image ? (
                  <div
                    className={styles.itemCover}
                    style={{
                      backgroundImage: `url(${book.image})`,
                      height: 190,
                    }}
                  ></div>
                ) : (
                  <div className={`${styles.itemCover} ${styles.empty}`}>Without cover</div>
                )}
                <p className={styles.itemTitle}>{book.title}</p>
                <p className={styles.itemDate}>
                  Page {book.progress_pages || '0'} / {book.pages}
                </p>
              </div>
            ))
          : "I'm not reading anything at the moment."}
      </div>
    </>
  );
}

export async function LetterboxdRecentActivity() {
  const data = await getLetterboxdActivity();

  return (
    <>
      <p className={styles.title}>Recently Watched Movies</p>
      <div className={styles.container}>
        {data.items.slice(0, 3).map((movie) => (
          <div className={styles.item} key={movie.pubDate}>
            <Image
              src={movie.cover}
              width={190}
              height={190}
              alt={movie.title}
              className={styles.itemCover}
              loading="eager"
            />
            <p className={styles.itemTitle}>
              {movie.memberLike === 'Yes' && <FaHeart className={styles.itemLike} />} {movie.title}
            </p>
            <p className={styles.itemDate}>Watched in {formatDate(movie.watchedDate)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function UnsplashRecentActivity() {
  const data = await getUnsplashActivity(3);

  return (
    <>
      <p className={styles.title}>Recent Photos</p>
      <div className={styles.container}>
        {data.photos.map((photo) => (
          <div className={styles.item} key={photo.id}>
            <div
              className={styles.itemCover}
              style={{
                backgroundImage: `url(${photo.urls.small})`,
                height: 190,
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}
