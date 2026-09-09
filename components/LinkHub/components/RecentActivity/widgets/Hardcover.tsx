import { getUserCurrentReads } from '~/lib/services/hardcover';

import Book from '../../Book';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function HardcoverWidget({ t, config }: RecentActivityProps) {
  if (!config.authorization) {
    return null;
  }

  const data = await getUserCurrentReads({ authorization: config.authorization });

  const books = data?.data?.me?.[0]?.user_books ?? [];

  if (books.length === 0) {
    return null;
  }

  return (
    <>
      {config.title && <h3 className={styles.title}>{t(config.title)}</h3>}
      <ul className={`${styles.grid} ${styles.fixedGrid3}`}>
        {books.map((book) => (
          <li className={styles.item} key={book.id}>
            <Book coverSrc={book.book.image?.url} title={book.book.title} />
            <h4 className={styles.itemTitle}>{book.book.title}</h4>
            <p className={styles.itemDate}>
              {t('components.linkhub.recentactivity.hardcover.pageprogress', {
                current: book.user_book_reads?.[0]?.progress_pages || '0',
                total: book.book.pages,
              })}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
