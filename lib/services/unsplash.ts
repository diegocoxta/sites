import { fetchJson } from '~/lib/http';

type GetRecentUserPhotosParamsType = {
  per_page?: number;
  page?: number;
  username: string;
  authorization: string;
};

type GetRecentUserPhotosResponseType = null | Array<{
  id: string;
  created_at: string;
  alt_description: string;
  urls: {
    small: string;
  };
}>;

export async function getRecentUserPhotos(
  params: GetRecentUserPhotosParamsType
): Promise<GetRecentUserPhotosResponseType> {
  const { per_page = 3, page = 1, username, authorization } = params;

  const photos = await fetchJson<GetRecentUserPhotosResponseType>(
    `https://api.unsplash.com/users/${username}/photos?per_page=${per_page}&page=${page}`,
    {
      headers: { Authorization: `Client-ID ${authorization}` },
      id: 'unsplash-photos',
    }
  );

  return photos;
}

type GetUserCollectionsParamsType = {
  per_page?: number;
  page?: number;
  username: string;
  authorization: string;
};

type GetUserCollectionsResponseType = null | Array<{
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

export async function getUserCollections(
  params: GetUserCollectionsParamsType
): Promise<GetUserCollectionsResponseType> {
  const { per_page = 10, page = 1, username, authorization } = params;

  const collections = await fetchJson<GetUserCollectionsResponseType>(
    `https://api.unsplash.com/users/${username}/collections?per_page=${per_page}&page=${page}`,
    {
      headers: { Authorization: `Client-ID ${authorization}` },
      id: 'unsplash-collections',
    }
  );

  return collections;
}
