import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import Container from '~/components/Container';
import PhotoLightbox from '~/components/PhotoLightbox';

import config from '~/app/diegocosta.me/config';

import { getPhotoDetails } from '~/app/diegocosta.me/photos/actions';
import { lightboxLabels } from '~/app/diegocosta.me/photos/labels';

const unsplash = Unsplash(config.unsplash);

interface PageProps {
  params: Promise<{ id: string; photo: string }>;
}

export async function generateStaticParams() {
  return unsplash.getAllCollectionPhotoParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, photo } = await params;
  const context = await unsplash.getCollectionPhotoContext(id, photo);
  const t = getTranslations(config);

  if (!context) {
    return {};
  }

  const title = context.photo.alt_description ?? t('page.photos.title');
  const description = context.photo.alt_description ?? t('page.photos.description');

  return {
    title,
    description,
    alternates: { canonical: `/collections/${id}/${photo}` },
  };
}

export default async function CollectionPhotoPage({ params }: PageProps) {
  const { id, photo } = await params;
  const [context, photoCollections] = await Promise.all([
    unsplash.getCollectionPhotoContext(id, photo),
    unsplash.getPhotoCollections(photo),
  ]);
  const t = getTranslations(config);

  if (!context) {
    notFound();
  }

  return (
    <Container>
      <PhotoLightbox
        variant="page"
        photo={context.photo}
        prevId={context.prevId}
        nextId={context.nextId}
        index={context.index}
        total={context.total}
        hrefBase={`/collections/${id}`}
        closeHref={`/collections/${id}`}
        photoCollections={photoCollections.filter((collection) => collection.id !== id)}
        getPhotoDetails={getPhotoDetails}
        labels={{
          close: t('page.collections.backToCollection'),
          ...lightboxLabels(t),
        }}
      />
    </Container>
  );
}
