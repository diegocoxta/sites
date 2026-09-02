import { fetchJson } from '~/lib/http';

type GetUserCurrentReadsParamsType = {
  authorization: string;
  limit?: number;
};

type GetUserCurrentReadsResponseType = null | {
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
};

export async function getUserCurrentReads(
  params: GetUserCurrentReadsParamsType
): Promise<GetUserCurrentReadsResponseType> {
  const { authorization, limit = 3 } = params;

  const query = `
  query ($limit: Int) {
    me {
      user_books(where: {status_id: {_eq: 2}}, limit: $limit, order_by: {updated_at: desc}) {
        id
        updated_at
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
`;

  const response = await fetchJson<GetUserCurrentReadsResponseType>('https://api.hardcover.app/v1/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify({ query, variables: { limit } }),
    id: 'hardcover',
  });

  return response;
}
