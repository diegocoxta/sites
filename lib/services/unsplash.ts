async function getResource<T>(url: string, { authorization }: { authorization: string }): Promise<T> {
  try {
    const response = await fetch(`https://api.unsplash.com/${url}`, {
      headers: {
        Authorization: `Client-ID ${authorization}`,
      },
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.error(error);

    return {} as T;
  }
}

type GetRecentUserPhotosParamsType = {
  per_page?: number;
  page?: number;
  username: string;
  authorization: string;
};

type GetRecentUserPhotosResponseType = {
  photos: Array<{
    id: string;
    created_at: string;
    alt_description: string;
    urls: {
      small: string;
    };
  }>;
};

export async function getRecentUserPhotos(
  params: GetRecentUserPhotosParamsType
): Promise<GetRecentUserPhotosResponseType> {
  try {
    const { per_page = 3, page = 1, username, authorization } = params;

    const photos = await getResource<GetRecentUserPhotosResponseType['photos']>(
      `/users/${username}/photos?per_page=${per_page}&page=${page}`,
      {
        authorization,
      }
    );

    return { photos };
  } catch (error) {
    console.error(error);
    return { photos: [] } as GetRecentUserPhotosResponseType;
  }
}

type GetUserCollectionsParamsType = {
  per_page?: number;
  page?: number;
  username: string;
  authorization: string;
};

export type GetUserCollectionsResponseType = {
  collections: Array<{
    id: string;
    title: string;
    description?: string;
    total_photos: number;
    published_at: string;
    preview_photos: Array<{
      id: string;
      slug: string;
      created_at: string;
      updated_at: string;
      blur_hash: string;
      asset_type: string;
      urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
      };
    }>;
    cover_photo: {
      id: string;
      width: number;
      height: number;
      color: string;
      blur_hash: string;
      description?: string;
      urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
      };
    };
  }>;
};

export async function getUserCollections(
  params: GetUserCollectionsParamsType
): Promise<GetUserCollectionsResponseType> {
  try {
    const { per_page = 10, page = 1, username, authorization } = params;

    const collections = await getResource<GetUserCollectionsResponseType['collections']>(
      `/users/${username}/collections?per_page=${per_page}&page=${page}`,
      {
        authorization,
      }
    );

    return { collections };
  } catch (error) {
    console.error(error);
    return { collections: [] } as GetUserCollectionsResponseType;
  }
}
