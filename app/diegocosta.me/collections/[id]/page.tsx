import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';

import { CollectionDetails, CollectionsCard, Feed, Profile } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getCollection, getCollectionPhotosPage, getCollections } from '~/app/diegocosta.me/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();

  return collections.map((collection) => ({ id: collection.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const collection = await getCollection(id);
  const t = getTranslations(config);

  if (!collection) {
    return {};
  }

  return {
    title: collection.title,
    description: collection.description ?? t('page.collections.description'),
    alternates: { canonical: `/collections/${id}` },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params;
  const t = getTranslations(config);
  const [collection, firstPage, collections] = await Promise.all([
    getCollection(id),
    getCollectionPhotosPage(id, 1),
    getCollections(),
  ]);
  const collectionIndex = collections.findIndex((entry) => entry.id === id);

  if (!collection && firstPage.ok && firstPage.photos.length === 0) {
    notFound();
  }

  const leading = (
    <>
      <Profile
        t={t}
        name={config.author}
        avatar="/avatar.jpg"
        socialLinks={config.links?.filter((link) => link.type === 'icon')}
      />
      {collection && (
        <CollectionDetails
          t={t}
          index={collectionIndex >= 0 ? collections.length - collectionIndex : collections.length}
          title={collection.title}
          description={collection.description}
          photoCount={collection.photoCount}
          publishedAt={collection.publishedAt}
        />
      )}
      {collections.length > 0 && <CollectionsCard t={t} collections={collections} activeId={id} />}
    </>
  );

  return firstPage.photos.length > 0 || firstPage.hasMore ? (
    <Feed
      initialPhotos={firstPage.photos}
      initialHasMore={firstPage.hasMore}
      loadMore={getCollectionPhotosPage.bind(null, id)}
      hrefBase="/p"
      leading={leading}
    />
  ) : (
    <p>{t('page.photos.empty')}</p>
  );
}
