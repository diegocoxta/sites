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

type GetNowPlayingParamsType = {
  username: string;
  authorization: string;
};

type GetNowPlayingResponseType = null | {
  artist: {
    mbid: string;
    '#text': string;
  };
  streamable: string;
  image: Array<{
    size: string;
    '#text': string;
  }>;
  mbid: string;
  album: {
    mbid: string;
    '#text': string;
  };
  name: string;
  '@attr': {
    nowplaying: string;
  };
  url: string;
};

type RecentTracksAPIResponseType = {
  recenttracks: {
    track: Array<NonNullable<GetNowPlayingResponseType>>;
  };
};

export async function getNowPlaying(params: GetNowPlayingParamsType): Promise<GetNowPlayingResponseType> {
  const { username, authorization } = params;

  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  url.searchParams.set('method', 'user.getrecenttracks');
  url.searchParams.set('user', username);
  url.searchParams.set('api_key', authorization);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');

  const response = await fetchJson<RecentTracksAPIResponseType | null>(url.toString(), {
    id: 'lastfmno-get-now-playing',
    revalidate: 0,
  });

  const track = response?.recenttracks?.track?.[0];

  if (!track || track['@attr']?.nowplaying !== 'true') {
    return null;
  }

  return track as GetNowPlayingResponseType;
}
