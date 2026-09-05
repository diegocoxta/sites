import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import PhotoLightbox from '~/components/PhotoLightbox';

import config from '~/app/diegocosta.me/config';

import { getPhotoDetails } from '~/app/diegocosta.me/photos/actions';
import { lightboxLabels } from '~/app/diegocosta.me/photos/labels';

const unsplash = Unsplash(config.unsplash);

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const photos = await unsplash.getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoModal({ params }: PageProps) {
  const { id } = await params;
  const [context, photoCollections] = await Promise.all([
    unsplash.getPhotoContext(id),
    unsplash.getPhotoCollections(id),
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
      hrefBase="/p"
      closeHref="/"
      photoCollections={photoCollections}
      getPhotoDetails={getPhotoDetails}
      labels={{
        close: t('page.photos.close'),
        ...lightboxLabels(t),
      }}
    />
  );
}
