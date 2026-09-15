import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { CollectionDetails, Feed, Profile } from '~/components/PhotoShowcase';

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

  const image = `/og/c/${id}`;

  return {
    title: collection.title,
    description: collection.description ?? t('page.collections.description'),
    alternates: { canonical: `/c/${id}` },
    openGraph: { siteName: t(config.title), url: `/c/${id}`, images: [image] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params;
  const t = getTranslations(config);
  const content = contentFor(config);
  const [collection, firstPage] = await Promise.all([getCollection(id), getCollectionPhotosPage(id, 1)]);

  if (!collection && firstPage.photos.length === 0) {
    notFound();
  }

  if (firstPage.photos.length <= 0) {
    return <p>{t('page.photos.empty')}</p>;
  }

  const leading = (
    <>
      <Profile
        t={t}
        name={config.author}
        avatar="/avatar.jpg"
        socialLinks={config.links?.filter((link) => link.type === 'icon')}
        pages={content.getPages()}
      />
      {collection && (
        <CollectionDetails
          t={t}
          title={collection.title}
          description={collection.description}
          photoCount={collection.photoCount}
          publishedAt={collection.publishedAt}
        />
      )}
    </>
  );

  return (
    <Feed
      initialPhotos={firstPage.photos}
      initialHasMore={firstPage.hasMore}
      loadMore={getCollectionPhotosPage.bind(null, id)}
      hrefBase="/p"
      leading={leading}
    />
  );
}
