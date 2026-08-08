'use server';

import { DISCOGS_TOKEN, DISCOGS_USERNAME } from '~/lib/envs';

import { cleanName } from './utils';
import { ApiResponse, Field, Folder, Instance, ReleaseDetails, Want } from './types';

async function getResource<T>(url: string): Promise<T> {
  try {
    const request = await fetch(`https://api.discogs.com/${url}`, {
      headers: {
        Authorization: `Discogs token=${DISCOGS_TOKEN}`,
      },
      next: { revalidate: 3600, tags: ['discogs'] },
    });

    const data = await request.json();

    return data as T;
  } catch (error) {
    console.error(error);
    return {} as T;
  }
}

type GetCollectionType = ApiResponse & {
  releases: Instance[];
  filters: {
    artists: string[];
    styles: string[];
    genres: string[];
  };
};

export async function getCollection(folderid: string): Promise<GetCollectionType> {
  const data = await getResource<GetCollectionType>(
    `users/${DISCOGS_USERNAME}/collection/folders/${folderid}/releases?sort=added&sort_order=desc`
  );

  data.filters = {
    artists: [
      ...new Set(data.releases?.flatMap((release) => release.basic_information.artists.map((a) => cleanName(a.name)))),
    ],
    styles: [...new Set(data.releases?.flatMap((release) => release.basic_information.styles))],
    genres: [...new Set(data.releases?.flatMap((release) => release.basic_information.genres))],
  };

  return data;
}

type GetWishlistType = ApiResponse & {
  wants: Want[];
};

export async function getWishlist(): Promise<GetWishlistType> {
  const data = await getResource<GetWishlistType>(`users/${DISCOGS_USERNAME}/wants?sort=added&sort_order=desc`);

  return data;
}

type GetFoldersType = { folders: Folder[] };

export async function getFolders(): Promise<GetFoldersType> {
  const data = await getResource<GetFoldersType>(`users/${DISCOGS_USERNAME}/collection/folders`);

  return data;
}

export async function getRelease(id: string): Promise<ReleaseDetails> {
  const data = await getResource<ReleaseDetails>(`releases/${id}`);

  return data;
}

export async function getInstance(id: string, instanceid: string): Promise<Instance> {
  const data = await getResource<Instance>(
    `users/${DISCOGS_USERNAME}/collection/folders/0/releases/${id}/instances/${instanceid}`
  );

  return data;
}

type GetCustomFields = { fields: Field[] };

export async function getCustomFields(): Promise<GetCustomFields> {
  const fieldsData = await getResource<GetCustomFields>(`users/${DISCOGS_USERNAME}/collection/fields`);

  return fieldsData;
}
