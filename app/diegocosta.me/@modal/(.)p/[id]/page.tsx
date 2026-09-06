import PhotoPreviewPage from '~/app/diegocosta.me/p/[id]/page';
import { getAllPhotos } from '~/app/diegocosta.me/actions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const photos = await getAllPhotos();

  return photos.map((photo) => ({ id: photo.id }));
}

export default async function PhotoModal(props: PageProps) {
  return <PhotoPreviewPage {...props} variant="modal" />;
}
