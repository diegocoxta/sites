import { fetchJson } from '~/lib/http';

type GetMonthlyTopArtistsParamsType = {
  username: string;
  authorization: string;
  limit?: number;
};

type GetMonthlyTopArtistsResponseType = null | {
  topartists: {
    artist: Array<{
      streamable: string;
      image: Array<{
        size: string;
        '#text': string;
      }>;
      mbid: string;
      url: string;
      playcount: string;
      '@attr': {
        rank: string;
      };
      name: string;
    }>;
  };
};

export async function getMonthlyTopArtists(
  params: GetMonthlyTopArtistsParamsType
): Promise<GetMonthlyTopArtistsResponseType> {
  const { username, authorization, limit = 3 } = params;

  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  url.searchParams.set('method', 'user.gettopartists');
  url.searchParams.set('user', username);
  url.searchParams.set('api_key', authorization);
  url.searchParams.set('format', 'json');
  url.searchParams.set('period', '1month');
  url.searchParams.set('limit', String(limit));

  const response = await fetchJson<GetMonthlyTopArtistsResponseType>(url.toString(), { id: 'lastfm' });

  return response;
}
