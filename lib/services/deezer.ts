type FindArtistParamsType = {
  name: string;
  limit?: number;
};

type FindArtistResponseType = {
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

export async function findArtists(params: FindArtistParamsType): Promise<FindArtistResponseType> {
  try {
    const { name, limit = 50 } = params;

    const url = new URL('https://api.deezer.com/search/artist');
    url.searchParams.append('q', `artist:"${name}"`);
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 * 24 },
    });

    const data: FindArtistResponseType = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {} as FindArtistResponseType;
  }
}

type FindArtistPhotoParamsType = Pick<FindArtistParamsType, 'name'>;
type FindArtistPhotoResponseTye = string | null;

export async function findArtistPhoto(params: FindArtistPhotoParamsType): Promise<FindArtistPhotoResponseTye> {
  try {
    const data: FindArtistResponseType = await findArtists(params);

    if (data.data && data.data.length > 0) {
      const artistaMaisPopular = data.data.sort((a, b) => b.nb_fan - a.nb_fan)[0];

      return artistaMaisPopular.picture_medium;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
