import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

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

export default async function CollectionPhotoModal({ params }: PageProps) {
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
    <PhotoLightbox
      variant="modal"
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
        close: t('page.photos.close'),
        ...lightboxLabels(t),
      }}
    />
  );
}
