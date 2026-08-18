interface GetMonthlyTopArtistsParamsType {
  username: string;
  authorization: string;
  limit?: number;
}

interface GetMonthlyTopArtistsResponseType {
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
}

export async function getMonthlyTopArtists(
  params: GetMonthlyTopArtistsParamsType
): Promise<GetMonthlyTopArtistsResponseType> {
  try {
    const { username, authorization, limit = 3 } = params;

    const request = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${authorization}&format=json&period=1month&limit=${limit}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data: GetMonthlyTopArtistsResponseType = await request.json();

    return data;
  } catch (error) {
    console.error(error);
    return {} as GetMonthlyTopArtistsResponseType;
  }
}
