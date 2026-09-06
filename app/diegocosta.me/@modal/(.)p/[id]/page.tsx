import { notFound } from 'next/navigation';

import { Lightbox } from '~/components/PhotoShowcase';

import { getAllPhotos, getPhotoContext, getPhotoDetails } from '~/app/diegocosta.me/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const photos = await getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoModal(props: PageProps) {
  const { params } = props;
  const { id } = await params;
  const context = await getPhotoContext(id);

  if (!context) {
    notFound();
  }

  return (
    <Lightbox
      variant="modal"
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
