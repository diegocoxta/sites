import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

interface HardcoverResponseType {
  data?: {
    me: Array<{
      user_books: Array<{
        id: number;
        user_book_reads: Array<{
          progress_pages: number;
          progress: number;
        }>;
        book: {
          id: number;
          title: string;
          pages: number;
          image?: {
            url: string;
          };
        };
      }>;
    }>;
  };
  errors?: Array<{ message: string }>;
}

export async function getActivity(authorization: string): Promise<HardcoverResponseType> {
  try {
    const response = await fetch('https://api.hardcover.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`,
      },
      body: JSON.stringify({
        query: `
    query Me {
      me {
        user_books(where: {status_id: {_eq: 2}}) {
          id
          user_book_reads {
            progress_pages
            progress
          }
          book {
            id
            title
            pages
            image {
              url
            }
          }
        }
      }
    }
  `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const result = (await response.json()) as HardcoverResponseType;

    if (result.errors) {
      console.error('Erros retornados pelo GraphQL:', result.errors);
      return {};
    }

    return result as HardcoverResponseType;
  } catch (error) {
    console.error('Erro de rede ou falha ao executar o fetch:', error);
    return {};
  }
}

export default async function HardcoverWidget(props: RecentActivityProps) {
  if (!props.authorization) {
    return <></>;
  }

  const data = await getActivity(props.authorization);
  const books = data.data?.me[0].user_books;

  return (
    <>
      <p className={styles.title}>Currently Reading</p>
      <div className={styles.container}>
        {books && books?.length > 0
          ? books?.slice(0, 3).map((book) => (
              <div className={styles.item} key={book.id}>
                {book.book.image ? (
                  <div
                    className={styles.itemCover}
                    style={{
                      backgroundImage: `url(${book.book.image.url})`,
                      height: 190,
                    }}
                  ></div>
                ) : (
                  <div className={`${styles.itemCover} ${styles.empty}`}>Without cover</div>
                )}
                <p className={styles.itemTitle}>{book.book.title}</p>
                <p className={styles.itemDate}>
                  Page {book.user_book_reads[0].progress_pages || '0'} / {book.book.pages}
                </p>
              </div>
            ))
          : "I'm not reading anything at the moment."}
      </div>
    </>
  );
}
