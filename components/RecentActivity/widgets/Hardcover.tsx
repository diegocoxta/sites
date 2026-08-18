import { getUserCurrentReads } from '~/lib/services/hardcover';
import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

export default async function HardcoverWidget(props: RecentActivityProps) {
  if (!props.authorization) {
    return <></>;
  }

  const data = await getUserCurrentReads({
    authorization: props.authorization,
  });

  const books = data.data?.me[0].user_books;

  return (
    <>
      <h3 className={styles.title}>Currently Reading</h3>
      <ul className={styles.container}>
        {books && books?.length > 0
          ? books?.map((book) => (
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
                    Without cover
                  </p>
                )}
                <h4 className={styles.itemTitle}>{book.book.title}</h4>
                <p className={styles.itemDate}>
                  Page {book.user_book_reads[0].progress_pages || '0'} / {book.book.pages}
                </p>
              </li>
            ))
          : "I'm not reading anything at the moment."}
      </ul>
    </>
  );
}
