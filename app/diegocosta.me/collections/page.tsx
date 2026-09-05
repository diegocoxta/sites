import type { Metadata } from 'next';

import { getTranslations } from '~/lib/i18n/messages';

import CollectionsList from '~/components/PhotographyPortfolio/components/CollectionsList';
import Profile from '~/components/PhotographyPortfolio/components/Profile';
import CollectionsCard from '~/components/PhotographyPortfolio/components/CollectionsCard';

import config from '~/app/diegocosta.me/config';

import { getCollections } from '~/app/diegocosta.me/actions';

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
  const collections = await getCollections();

  const leading = (
    <>
      <Profile
        t={t}
        name={config.author}
        avatar="/avatar.jpg"
        socialLinks={config.links?.filter((link) => link.type === 'icon')}
      />
      {collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
    </>
  );

  return collections.length > 0 ? (
    <CollectionsList collections={collections} leading={leading} t={t} />
  ) : (
    <p>{t('page.collections.empty')}</p>
  );
}
