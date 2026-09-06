import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';

import { CollectionsCard, Lightbox, Page, Profile } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollections, getPhotoContext, getPhotoDetails } from '~/app/diegocosta.me/actions';

interface PhotoPreviewProps {
  params: Promise<{ id: string }>;
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
  const { params } = props;
  const { id } = await params;

  const t = getTranslations(config);
  const [context, collections] = await Promise.all([getPhotoContext(id), getCollections()]);

  if (!context) {
    notFound();
  }

  return (
    <Page
      leading={
        <>
          <Profile
            t={t}
            name={config.author}
            avatar={config.avatar ?? ''}
            socialLinks={config.links?.filter((link) => link.type === 'icon')}
          />
          {collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
        </>
      }
    >
      <Lightbox
        variant="page"
        photo={context.photo}
        prevId={context.prevId}
        nextId={context.nextId}
        index={context.index}
        total={context.total}
        hrefBase="/p"
        closeHref="/"
        getPhotoDetails={getPhotoDetails}
      />
    </Page>
  );
}
