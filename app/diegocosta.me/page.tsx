import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import PhotoGallery from '~/components/PhotoGallery';

import config from '~/app/diegocosta.me/config';

import { loadMorePhotos } from './photos/actions';
import { IconLinkType } from '~/lib/config';
import PhotoGalleryHeader from '~/components/PhotoGallery/components/Header';

const unsplash = Unsplash(config.unsplash);

export default async function HomePage() {
  const t = getTranslations(config);
  const [{ photos, hasMore }, collections] = await Promise.all([unsplash.getPhotosPage(1), unsplash.getCollections()]);

  const leading = (
    <PhotoGalleryHeader
      profile={{
        name: config.author,
        bio: t('page.home.bio'),
        portrait: '/avatar.jpg',
        socialLinks: config.links?.filter((link): link is IconLinkType => link.type === 'icon'),
      }}
      collections={{
        title: t('page.collections.title'),
        viewAllLabel: t('page.collections.backToList'),
        list: collections.map(({ id, title, totalPhotos }) => ({ id, title, totalPhotos })),
      }}
    />
  );

  return photos.length > 0 || hasMore ? (
    <PhotoGallery
      initialPhotos={photos}
      initialHasMore={hasMore}
      loadMore={loadMorePhotos}
      hrefBase="/p"
      leading={leading}
      labels={{
        loading: t('page.photos.loading'),
        loadMore: t('page.photos.loadMore'),
        retry: t('page.photos.retry'),
      }}
    />
  ) : (
    <p>{t('page.photos.empty')}</p>
  );
}
