import { fetchJson } from '~/lib/http';

/**
 * Unsplash's demo tier allows only 50 requests/hour — far too little to serve every
 * visitor live. All the photo/collection pages are built statically (generateStaticParams
 * walks every page during `yarn build`), so caching indefinitely here just means "reuse
 * what the build already downloaded until the next build/deploy" instead of re-fetching
 * per visit. Nothing time-based revalidates this data; a new build is what refreshes it.
 */
const REVALIDATE = false;

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
  width: number;
  height: number;
  color: string | null;
  likes: number;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  links: {
    html: string;
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
      revalidate: REVALIDATE,
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
      revalidate: REVALIDATE,
    }
  );

  return collections;
}

type GetPhotoParamsType = {
  id: string;
  authorization: string;
};

type GetPhotoResponseType = null | {
  id: string;
  description: string | null;
  exif: {
    make: string | null;
    model: string | null;
    exposure_time: string | null;
    aperture: string | null;
    focal_length: string | null;
    iso: number | null;
  } | null;
  location: {
    name: string | null;
    city: string | null;
    country: string | null;
    position: {
      latitude: number | null;
      longitude: number | null;
    } | null;
  } | null;
};

export async function getPhoto(params: GetPhotoParamsType): Promise<GetPhotoResponseType> {
  const { id, authorization } = params;

  const photo = await fetchJson<GetPhotoResponseType>(`https://api.unsplash.com/photos/${id}`, {
    headers: { Authorization: `Client-ID ${authorization}` },
    id: 'unsplash-photo',
    revalidate: REVALIDATE,
  });

  return photo;
}

type GetCollectionPhotosParamsType = {
  id: string;
  per_page?: number;
  page?: number;
  authorization: string;
};

export async function getCollectionPhotos(
  params: GetCollectionPhotosParamsType
): Promise<GetRecentUserPhotosResponseType> {
  const { id, per_page = 3, page = 1, authorization } = params;

  const photos = await fetchJson<GetRecentUserPhotosResponseType>(
    `https://api.unsplash.com/collections/${id}/photos?per_page=${per_page}&page=${page}`,
    {
      headers: { Authorization: `Client-ID ${authorization}` },
      id: 'unsplash-collection-photos',
      revalidate: REVALIDATE,
    }
  );

  return photos;
}
