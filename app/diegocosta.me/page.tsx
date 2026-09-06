import { getTranslations } from '~/lib/i18n/messages';

import { CollectionsCard, Feed, Profile } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getCollections, getPhotosPage } from '~/app/diegocosta.me/actions';

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
