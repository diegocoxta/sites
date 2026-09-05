import type { Metadata } from 'next';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import PhotoCollectionList from '~/components/PhotoCollectionList';

import config from '~/app/diegocosta.me/config';

const unsplash = Unsplash(config.unsplash);

export function generateMetadata(): Metadata {
  const t = getTranslations(config);

  return {
    title: t('page.collections.title'),
    description: t('page.collections.description'),
    alternates: { canonical: '/collections' },
  };
}

export default async function CollectionsPage() {
  const t = getTranslations(config);
  const collections = await unsplash.getCollections();

  return (
    <>
      {collections.length > 0 ? (
        <PhotoCollectionList collections={collections} t={t} />
      ) : (
        <p>{t('page.collections.empty')}</p>
      )}
    </>
  );
}
