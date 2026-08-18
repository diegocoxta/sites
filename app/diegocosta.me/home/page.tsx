import { getUserCollections } from '~/lib/services/unsplash';

import PhotoCollectionList from '~/components/PhotoCollectionList';

import config from '~/app/diegocosta.me/config';

export default async function HomePage() {
  const { authorization, username } = config.unsplash;

  if (!username || !authorization) {
    return <></>;
  }

  const collections = await getUserCollections({
    authorization,
    username,
    per_page: 20,
  });

  return <PhotoCollectionList collections={collections.collections} />;
}
