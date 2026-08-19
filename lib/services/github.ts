interface GetContributionsCalendarParamsType {
  username: string;
  authorization: string;
  months?: number;
}

interface GetContributionsCalendarResponseType {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number;
      date: string;
      color: string;
    }>;
  }>;
}

export async function getContributionsCalendar(
  params: GetContributionsCalendarParamsType
): Promise<GetContributionsCalendarResponseType | null> {
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

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${authorization}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          userName: username,
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    return data?.data?.user?.contributionsCollection?.contributionCalendar || null;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return null;
  }
}
