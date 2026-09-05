import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import Feed from '~/components/PhotographyPortfolio';
import Profile from '~/components/PhotographyPortfolio/components/Profile';
import CollectionsCard from '~/components/PhotographyPortfolio/components/CollectionsCard';

import config from '~/app/diegocosta.me/config';

import { getCollectionPhotosPage } from '~/app/diegocosta.me/actions';
import { toCollectionSummary, toGalleryPage } from '~/app/diegocosta.me/portfolio';

import styles from './page.module.css';

const unsplash = Unsplash(config.unsplash);

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const collections = await unsplash.getCollections();

  return collections.map((collection) => ({ id: collection.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const collection = await unsplash.getCollection(id);
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
  const [collection, firstPageRaw, collectionsRaw] = await Promise.all([
    unsplash.getCollection(id),
    unsplash.getCollectionPhotosPage(id, 1),
    unsplash.getCollections(),
  ]);
  const firstPage = toGalleryPage(firstPageRaw);
  const collections = collectionsRaw.map(toCollectionSummary);

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
      {collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
      <div className={styles.intro}>
        <Link className={styles.back} href="/collections">
          &larr; {t('page.collections.backToList')}
        </Link>
        <h1>{collection?.title ?? t('page.collections.title')}</h1>
        {collection?.description && <p className={styles.description}>{collection.description}</p>}
      </div>
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
