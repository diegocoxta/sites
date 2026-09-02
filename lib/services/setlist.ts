import { fetchJson } from '~/lib/http';

type GetUserConcertsAttendanceParamsType = {
  username: string;
  authorization: string;
  page?: number;
};

type GetUserConcertsAttendanceResponseType = null | {
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
};

export async function getUserConcertsAttendance(
  params: GetUserConcertsAttendanceParamsType
): Promise<GetUserConcertsAttendanceResponseType> {
  const { username, authorization, page = 1 } = params;

  const data = await fetchJson<GetUserConcertsAttendanceResponseType>(
    `https://api.setlist.fm/rest/1.0/user/${username}/attended?p=${page}`,
    {
      headers: {
        'x-api-key': authorization,
        accept: 'application/json',
      },
      id: 'setlist',
    }
  );

  return data;
}
