import { getTranslations } from '~/lib/i18n/messages';

import Feed from '~/components/PhotographyPortfolio';
import Profile from '~/components/PhotographyPortfolio/components/Profile';
import CollectionsCard from '~/components/PhotographyPortfolio/components/CollectionsCard';

import config from '~/app/diegocosta.me/config';

import { getCollections, getPhotosPage } from './actions';

export default async function HomePage() {
  const t = getTranslations(config);
  const [{ photos, hasMore }, collections] = await Promise.all([getPhotosPage(1), getCollections()]);

  const leading = (
    <>
      <Profile
        t={t}
        name={config.author}
        avatar="/avatar.jpg"
        socialLinks={config.links?.filter((link) => link.type === 'icon')}
      />
      {collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
    </>
  );

  return photos.length > 0 || hasMore ? (
    <Feed initialPhotos={photos} initialHasMore={hasMore} loadMore={getPhotosPage} hrefBase="/p" leading={leading} />
  ) : (
    <p>{t('page.photos.empty')}</p>
  );
}
