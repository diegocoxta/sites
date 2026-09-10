import { getUserCurrentReads } from '~/lib/services/hardcover';

import RecentActivity, { type RecentActivityWidgetProps } from '~/components/LinkHub/components/RecentActivity';

import styles from './styles.module.css';

export default async function HardcoverWidget({ t, config }: RecentActivityWidgetProps) {
  if (!config.authorization) {
    return null;
  }

  const data = await getUserCurrentReads({ authorization: config.authorization });

  const books = data?.data?.me?.[0]?.user_books ?? [];

  if (books.length === 0) {
    return null;
  }

  return (
    <RecentActivity title={config.title && t(config.title)} layout="grid" gridColumns={3}>
      {books.map(({ book, user_book_reads }) => {
        const titleScale = Math.min(1.6, Math.max(0.35, 6 / Math.sqrt(book.title?.length || 1)));

        const coverStyle: React.CSSProperties = book.image?.url ? { backgroundImage: `url("${book.image.url}")` } : {};

        const titleStyle = {
          '--title-scale': titleScale,
        } as React.CSSProperties;

        return (
          <RecentActivity.Item key={book.id}>
            <div className={styles.book}>
              <div className={styles.cover} style={coverStyle} role="img" aria-label={book.title}>
                {!book.image?.url && (
                  <span className={styles.name} style={titleStyle}>
                    {book.title}
                  </span>
                )}
              </div>
            </div>
            <h4 className={styles.title}>{book.title}</h4>
            <p className={styles.progress}>
              {t('components.linkhub.recentactivity.hardcover.pageprogress', {
                current: user_book_reads?.[0]?.progress_pages || '0',
                total: book.pages,
              })}
            </p>
          </RecentActivity.Item>
        );
      })}
    </RecentActivity>
  );
}
