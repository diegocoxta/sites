import Unsplash from '~/lib/unsplash';

import config from '~/app/diegocosta.me/config';

const unsplash = Unsplash(config.unsplash);

import PhotoPreviewPage from '~/app/diegocosta.me/p/[id]/page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const photos = await unsplash.getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoModal(props: PageProps) {
  return <PhotoPreviewPage {...props} variant="modal" />;
}
