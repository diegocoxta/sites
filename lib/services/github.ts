import { fetchJson } from '~/lib/http';

type GetContributionsCalendarParamsType = {
  username: string;
  authorization: string;
  months?: number;
};

type GetContributionsCalendarResponseType = null | {
  data: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks?: Array<{
            contributionDays?: Array<{
              contributionCount: number;
              date: string;
              color: string;
            }>;
          }>;
        };
      };
    };
  };
};

export async function getContributionsCalendar(
  params: GetContributionsCalendarParamsType
): Promise<GetContributionsCalendarResponseType> {
  const { username, authorization, months = 6 } = params;

  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setMonth(toDate.getMonth() - months);

  const query = `
    query($userName: String!, $fromDate: DateTime, $toDate: DateTime) {
      user(login: $userName){
        contributionsCollection(from: $fromDate, to: $toDate) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchJson<GetContributionsCalendarResponseType>('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${authorization}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        userName: username,
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      },
    }),
    id: 'github',
    timeoutMs: 10000, // 10 seconds
  });

  return response;
}
