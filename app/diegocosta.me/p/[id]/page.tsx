import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';

import { Lightbox } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getPhotoContext, getPhotoDetails } from '~/app/diegocosta.me/actions';

interface PhotoPreviewProps {
  params: Promise<{ id: string }>;
  variant?: 'page' | 'modal';
}

export async function generateStaticParams() {
  const photos = await getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export async function generateMetadata({ params }: PhotoPreviewProps): Promise<Metadata> {
  const { id } = await params;
  const context = await getPhotoContext(id);
  const t = getTranslations(config);

  if (!context) {
    return {};
  }

  return {
    title: context.photo.alt || t('page.photos.title'),
    description: context.photo.alt || t('page.photos.description'),
    alternates: { canonical: `/p/${id}` },
  };
}

export default async function PhotoPreviewPage(props: PhotoPreviewProps) {
  const { params, variant = 'page' } = props;
  const { id } = await params;
  const context = await getPhotoContext(id);

  if (!context) {
    notFound();
  }

  return (
    <Lightbox
      variant={variant}
      photo={context.photo}
      prevId={context.prevId}
      nextId={context.nextId}
      index={context.index}
      total={context.total}
      hrefBase="/p"
      closeHref="/"
      getPhotoDetails={getPhotoDetails}
    />
  );
}
