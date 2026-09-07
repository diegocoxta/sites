import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTranslations } from '~/lib/i18n/messages';
import { imageObjectLd } from '~/lib/schema';

import { CollectionsCard, Lightbox, Page, Profile } from '~/components/PhotoShowcase';
import JsonLd from '~/components/JsonLd';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollections, getPhotoContext, getPhotoDetails } from '~/app/diegocosta.me/actions';

interface PhotoPreviewProps {
  params: Promise<{ id: string }>;
}

const photoTitle = (alt: string, index: number, total: number): string =>
  alt.trim() || `Photograph ${index + 1} of ${total}`;

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

  const { photo, index, total } = context;
  const image = { url: photo.src, width: photo.width, height: photo.height };
  const title = photoTitle(photo.alt, index, total);

  return {
    title,
    description: photo.alt.trim() || t('page.photos.description'),
    alternates: { canonical: `/p/${id}` },
    openGraph: { siteName: t(config.title), title, url: `/p/${id}`, images: [image] },
    twitter: { card: 'summary_large_image', title, images: [image] },
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

  const { photo, index, total } = context;
  const title = photoTitle(photo.alt, index, total);

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
      <h1 className="srOnly">{title}</h1>
      <JsonLd data={imageObjectLd(config, photo, title)} />
      <Lightbox
        variant="page"
        photo={photo}
        prevId={context.prevId}
        nextId={context.nextId}
        index={index}
        total={total}
        hrefBase="/p"
        closeHref="/"
        getPhotoDetails={getPhotoDetails}
      />
    </Page>
  );
}
