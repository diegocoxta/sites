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
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const photos = await unsplash.getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const context = await unsplash.getPhotoContext(id);
  const t = getTranslations(config);

  if (!context) {
    return {};
  }

  const title = context.photo.alt_description ?? t('page.photos.title');
  const description = context.photo.alt_description ?? t('page.photos.description');

  return {
    title,
    description,
    alternates: { canonical: `/p/${id}` },
  };
}

export default async function PhotoPage({ params }: PageProps) {
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
    <Container>
      <PhotoLightbox
        variant="page"
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
          close: t('page.photos.backToGallery'),
          ...lightboxLabels(t),
        }}
      />
    </Container>
  );
}
