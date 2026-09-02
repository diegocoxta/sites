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

  const response = await fetchJson<GetMonthlyTopArtistsResponseType>(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${authorization}&format=json&period=1month&limit=${limit}`,
    { id: 'lastfm' }
  );

  return response;
}
