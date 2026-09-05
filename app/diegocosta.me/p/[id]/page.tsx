import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import Lightbox from '~/components/PhotographyPortfolio/components/Lightbox';

import config from '~/app/diegocosta.me/config';

import { getPhotoDetails } from '~/app/diegocosta.me/actions';
import { toCollectionRef, toLightboxPhoto } from '~/app/diegocosta.me/portfolio';

const unsplash = Unsplash(config.unsplash);

interface PhotoPreviewProps {
  params: Promise<{ id: string }>;
  variant?: 'page' | 'modal';
}

export async function generateStaticParams() {
  const photos = await unsplash.getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export async function generateMetadata({ params }: PhotoPreviewProps): Promise<Metadata> {
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

export default async function PhotoPreviewPage({ params, variant = 'page' }: PhotoPreviewProps) {
  const { id } = await params;
  const [context, photoCollections] = await Promise.all([
    unsplash.getPhotoContext(id),
    unsplash.getPhotoCollections(id),
  ]);

  if (!context) {
    notFound();
  }

  return (
    <Lightbox
      variant={variant}
      photo={toLightboxPhoto(context.photo)}
      prevId={context.prevId}
      nextId={context.nextId}
      index={context.index}
      total={context.total}
      hrefBase="/p"
      closeHref="/"
      photoCollections={photoCollections.map(toCollectionRef)}
      getPhotoDetails={getPhotoDetails}
    />
  );
}
