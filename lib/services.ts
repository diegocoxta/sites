import { XMLParser } from 'fast-xml-parser';
import * as envs from '~/lib/envs';

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    timeZone: 'UTC',
    month: 'long',
    year: 'numeric',
  });
}

interface GetDiscogsCollectionReleasesType {
  releases: Array<{
    id: string;
    date_added: string;
    basic_information: {
      cover_image: string;
      title: string;
      artists: Array<{
        name: string;
      }>;
    };
  }>;
}

export async function getDiscogsActivity(): Promise<GetDiscogsCollectionReleasesType> {
  try {
    const request = await fetch(
      `https://api.discogs.com/users/${envs.DISCOGS_USERNAME}/collection/folders/0/releases?sort=added&sort_order=desc`,
      {
        headers: {
          Authorization: `Discogs token=${envs.DISCOGS_TOKEN}`,
        },
        next: { revalidate: 3600, tags: ['discogs'] },
      }
    );

    const data = await request.json();

    return data as GetDiscogsCollectionReleasesType;
  } catch (error) {
    console.error(error);
    return {} as GetDiscogsCollectionReleasesType;
  }
}

interface GetLetterboxdActivityType {
  items: Array<{
    title: string;
    watchedDate: string;
    memberLike: string;
    cover: string;
    pubDate: string;
  }>;
}

export async function getLetterboxdActivity(): Promise<GetLetterboxdActivityType> {
  try {
    const response = await fetch(`https://letterboxd.com/${envs.LETTERBOXD_USERNAME}/rss/`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar o RSS: ${response.statusText}`);
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const parsedData = parser.parse(xmlData);

    const items = parsedData.rss?.channel?.item;

    if (!items) {
      return { items: [] } as GetLetterboxdActivityType;
    }

    const moviesArray = Array.isArray(items) ? items : [items];

    const movies: GetLetterboxdActivityType['items'] = moviesArray.map((item) => {
      const description = item.description || '';
      const imgMatch = description.match(/src="([^"]+)"/);
      const coverUrl = imgMatch ? imgMatch[1] : '';

      return {
        title: item['letterboxd:filmTitle'] || item.title,
        watchedDate: item['letterboxd:watchedDate'] || '',
        memberLike: item['letterboxd:memberLike'] || 'No',
        cover: coverUrl,
        pubDate: item['pubDate'] || '',
      };
    });

    return { items: movies };
  } catch (error) {
    console.error('Erro ao processar o feed do Letterboxd:', error);
    return { items: [] } as GetLetterboxdActivityType;
  }
}

interface GetUnsplashPhotosType {
  photos: Array<{
    id: string;
    created_at: string;
    alt_description: string;
    urls: {
      thumb: string;
    };
  }>;
}

export async function getUnsplashActivity(length: number): Promise<GetUnsplashPhotosType> {
  try {
    const request = await fetch(
      `https://api.unsplash.com/users/${envs.UNSPLASH_USERNAME}/photos?per_page=${length}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${envs.UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600, tags: ['unsplash'] },
      }
    );

    const data = await request.json();

    return { photos: data } as GetUnsplashPhotosType;
  } catch (error) {
    console.error(error);
    return {} as GetUnsplashPhotosType;
  }
}

interface GetHardcoverActivityRawQueryType {
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

interface GetHardcoverActivityType {
  books?: Array<{
    id: number;
    progress_pages?: number;
    title: string;
    image?: string | null;
    pages: number;
  }>;
}

export async function getHardcoverActivity(): Promise<GetHardcoverActivityType> {
  try {
    const response = await fetch('https://api.hardcover.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envs.HARDCOVER_TOKEN}`,
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

    const result = (await response.json()) as GetHardcoverActivityRawQueryType;

    if (result.errors) {
      console.error('Erros retornados pelo GraphQL:', result.errors);
      return {};
    }

    const books = result.data?.me[0].user_books.map((book) => ({
      id: book.id,
      progress_pages: book.user_book_reads[0]?.progress_pages,
      title: book.book.title,
      image: book.book.image?.url,
      pages: book.book.pages,
    }));

    return { books };
  } catch (error) {
    console.error('Erro de rede ou falha ao executar o fetch:', error);
    return {};
  }
}
