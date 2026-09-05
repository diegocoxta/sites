import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import Container from '~/components/Container';
import PhotoGallery from '~/components/PhotoGallery';

import config from '~/app/diegocosta.me/config';

import { loadMoreCollectionPhotos } from '../actions';

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
  const [collection, firstPage] = await Promise.all([
    unsplash.getCollection(id),
    unsplash.getCollectionPhotosPage(id, 1),
  ]);

  if (!collection && firstPage.ok && firstPage.photos.length === 0) {
    notFound();
  }

  return (
    <Container>
      <Link className={styles.back} href="/collections">
        &larr; {t('page.collections.backToList')}
      </Link>
      <h1>{collection?.title ?? t('page.collections.title')}</h1>
      {collection?.description && <p className={styles.description}>{collection.description}</p>}
      {firstPage.photos.length > 0 || firstPage.hasMore ? (
        <PhotoGallery
          initialPhotos={firstPage.photos}
          initialHasMore={firstPage.hasMore}
          loadMore={loadMoreCollectionPhotos.bind(null, id)}
          hrefBase={`/collections/${id}`}
          labels={{
            loading: t('page.photos.loading'),
            loadMore: t('page.photos.loadMore'),
            retry: t('page.photos.retry'),
          }}
        />
      ) : (
        <p>{t('page.photos.empty')}</p>
      )}
    </Container>
  );
}
