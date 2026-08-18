type GetUserCurrentReadsParamsType = {
  authorization: string;
  limit?: number;
};

type GetUserCurrentReadsResponseType = {
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
  try {
    const { authorization, limit = 3 } = params;
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
        user_books(where: {status_id: {_eq: 2}}, limit: ${limit}) {
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
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const result: GetUserCurrentReadsResponseType = await response.json();

    if (result.errors) {
      console.error('Erros retornados pelo GraphQL:', result.errors);
      return {};
    }

    return result;
  } catch (error) {
    console.error('Erro de rede ou falha ao executar o fetch:', error);
    return {};
  }
}
