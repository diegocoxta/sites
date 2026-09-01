import { FaBook } from 'react-icons/fa6';

import { getUserCurrentReads } from '~/lib/services/hardcover';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function HardcoverWidget({ config, t }: RecentActivityProps) {
  if (!config.authorization) {
    return <></>;
  }

  const data = await getUserCurrentReads({
    authorization: config.authorization.toString(),
  });

  const books = data.data?.me?.[0]?.user_books;

  return (
    books &&
    books?.length > 0 && (
      <>
        {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
        <ul className={styles.grid}>
          {books?.map((book) => (
            <li className={styles.item} key={book.id}>
              {book.book.image ? (
                <div
                  className={styles.itemCover}
                  style={{
                    backgroundImage: `url(${book.book.image.url})`,
                    height: 190,
                  }}
                  aria-hidden
                ></div>
              ) : (
                <p className={`${styles.itemCover} ${styles.empty}`} aria-hidden>
                  <FaBook />
                </p>
              )}
              <h4 className={styles.itemTitle}>{book.book.title}</h4>
              <p className={styles.itemDate}>
                {t('components.recentActivity.hardcover.pageProgress', {
                  current: book.user_book_reads?.[0]?.progress_pages || '0',
                  total: book.book.pages,
                })}
              </p>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
