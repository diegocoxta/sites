import { XMLParser } from 'fast-xml-parser';

type GetRecentlyWatchedMoviesParamsType = {
  username: string;
  limit?: number;
};

type GetRecentlyWatchedMoviesResponseType = {
  movies: Array<{
    title: string;
    watchedDate: string;
    memberLike: string;
    cover: string;
    pubDate: string;
    stars: number;
  }>;
};

export async function getRecentlyWatchedMovies(
  params: GetRecentlyWatchedMoviesParamsType
): Promise<GetRecentlyWatchedMoviesResponseType> {
  try {
    const { username, limit = 3 } = params;

    const response = await fetch(`https://letterboxd.com/${username}/rss/`, {
      next: { revalidate: 3600 },
    });

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
      return { movies: [] } as GetRecentlyWatchedMoviesResponseType;
    }

    const moviesArray = Array.isArray(items) ? items : [items];

    const movies: GetRecentlyWatchedMoviesResponseType['movies'] = moviesArray.slice(0, limit).map((item) => {
      const description = item.description || '';
      const imgMatch = description.match(/src="([^"]+)"/);
      const coverUrl = imgMatch ? imgMatch[1] : '';

      return {
        title: item['letterboxd:filmTitle'] || item.title,
        watchedDate: item['letterboxd:watchedDate'] || '',
        memberLike: item['letterboxd:memberLike'] || 'No',
        cover: coverUrl,
        pubDate: item['pubDate'] || '',
        stars: item.title.split('★').length - 1,
      };
    });

    return { movies };
  } catch (error) {
    console.error('Erro ao processar o feed do Letterboxd:', error);
    return { movies: [] } as GetRecentlyWatchedMoviesResponseType;
  }
}
