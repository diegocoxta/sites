type GetUserConcertsAttendanceParamsType = {
  username: string;
  authorization: string;
  page?: number;
};

interface GetUserConcertsAttendanceResponseType {
  type: string;
  itemsPerPage: number;
  page: number;
  total: number;
  setlist: Array<{
    id: string;
    versionId: string;
    eventDate: string;
    lastUpdated: string;
    artist: {
      mbid: string;
      name: string;
      sortName: string;
      disambiguation: string;
      url: string;
    };
    venue: {
      id: string;
      name: string;
      city: {
        id: string;
        name: string;
        state: string;
        stateCode: string;
        coords: {
          lat: number;
          long: number;
        };
        country: {
          code: string;
          name: string;
        };
      };
      url: string;
    };
    tour: {
      name: string;
    };
    sets: {
      set: Array<{
        song: Array<{
          name: string;
          cover?: {
            mbid: string;
            name: string;
            sortName: string;
            disambiguation: string;
            url: string;
          };
          with?: {
            mbid: string;
            name: string;
            sortName: string;
            disambiguation: string;
            url: string;
          };
          tape?: boolean;
          info?: string;
        }>;
        name?: string;
        encore?: number;
      }>;
    };
    info?: string;
    url: string;
  }>;
}

export async function getUserConcertsAttendance(
  params: GetUserConcertsAttendanceParamsType
): Promise<GetUserConcertsAttendanceResponseType> {
  try {
    const { username, authorization, page = 1 } = params;
    const request = await fetch(`https://api.setlist.fm/rest/1.0/user/${username}/attended?p=${page}`, {
      headers: {
        'x-api-key': authorization,
        accept: 'application/json',
      },
      next: { revalidate: 3600 },
    });

    const data: GetUserConcertsAttendanceResponseType = await request.json();

    return data;
  } catch (error) {
    console.error(error);
    return {} as GetUserConcertsAttendanceResponseType;
  }
}
