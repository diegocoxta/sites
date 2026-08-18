type GetUserCollectionParamsType = {
  username: string;
  authorization: string;
  per_page?: number;
  page?: number;
};

interface GetUserCollectionResponseType {
  releases: Array<{
    id: string;
    date_added: string;
    basic_information: {
      cover_image: string;
      title: string;
      artists: Array<{
        name: string;
      }>;
    };
  }>;
}

export async function getUserCollection(params: GetUserCollectionParamsType): Promise<GetUserCollectionResponseType> {
  try {
    const { username, authorization, per_page = 3, page = 1 } = params;
    const request = await fetch(
      `https://api.discogs.com/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc&page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `Discogs token=${authorization}`,
        },
        next: { revalidate: 3600 },
      }
    );

    const data: GetUserCollectionResponseType = await request.json();

    return data;
  } catch (error) {
    console.error(error);
    return {} as GetUserCollectionResponseType;
  }
}
