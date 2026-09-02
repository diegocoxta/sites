import { fetchJson } from '~/lib/http';

type FindArtistParamsType = {
  name: string;
  limit?: number;
};

type FindArtistResponseType = null | {
  data: Array<{
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    nb_album: number;
    nb_fan: number;
    radio: boolean;
    tracklist: string;
    type: string;
  }>;
  total: number;
};

export async function findArtistPhoto(params: FindArtistParamsType): Promise<string | null> {
  const { name, limit = 50 } = params;

  const url = new URL('https://api.deezer.com/search/artist');
  url.searchParams.set('q', `artist:"${name}"`);
  url.searchParams.set('limit', String(limit));

  const response = await fetchJson<FindArtistResponseType>(url.toString(), {
    id: 'deezer',
    timeoutMs: 10000,
  });

  if (response?.data.length === 0) {
    return null;
  }

  const mostPopular = response?.data.reduce((best, artist) => (artist.nb_fan > best.nb_fan ? artist : best));

  return mostPopular?.picture_medium || null;
}
