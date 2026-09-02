import { XMLParser } from 'fast-xml-parser';

import { fetchText } from '~/lib/http';

type GetRecentlyWatchedMoviesParamsType = {
  username: string;
  limit?: number;
};

type GetRecentlyWatchedMoviesResponseType = null | Array<{
  title: string;
  watchedDate: string;
  memberLike: string;
  cover: string;
  pubDate: string;
  stars: number;
}>;

export async function getRecentlyWatchedMovies(
  params: GetRecentlyWatchedMoviesParamsType
): Promise<GetRecentlyWatchedMoviesResponseType> {
  const { username, limit = 3 } = params;

  const response = await fetchText(`https://letterboxd.com/${username}/rss/`, { id: 'letterboxd' });

  if (!response) {
    return null;
  }

  try {
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(response);
    const items = parsed.rss?.channel?.item;

    if (!items) {
      return null;
    }

    const itemsArray = Array.isArray(items) ? items : [items];

    const data: GetRecentlyWatchedMoviesResponseType = itemsArray.slice(0, limit).map((item) => {
      const description = item.description || '';
      const imgMatch = description.match(/src="([^"]+)"/);

      return {
        title: item['letterboxd:filmTitle'] || item.title,
        watchedDate: item['letterboxd:watchedDate'] || '',
        memberLike: item['letterboxd:memberLike'] || 'No',
        cover: imgMatch ? imgMatch[1] : '',
        pubDate: item['pubDate'] || '',
        stars: item.title.split('★').length - 1,
      };
    });

    return data;
  } catch (error) {
    console.error(`[letterboxd] failed to parse feed — ${username}`, error);
    return null;
  }
}
