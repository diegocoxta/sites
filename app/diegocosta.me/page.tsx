import type { Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { CollectionsCard, Feed, Profile } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getCollections, getPhotosPage } from '~/app/diegocosta.me/actions';

export default async function HomePage() {
  const t = getTranslations(config);
  const content = contentFor(config);
  const [{ photos, hasMore }, collections] = await Promise.all([getPhotosPage(1), getCollections()]);

  if (photos.length <= 0) {
    return <p>{t('page.photos.empty')}</p>;
  }

  return (
    <>
      <h1 className="srOnly">{t('config.title')}</h1>
      <Feed
        initialPhotos={photos}
        initialHasMore={hasMore}
        loadMore={getPhotosPage}
        hrefBase="/p"
        leading={
          <Profile
            t={t}
            name={config.author}
            avatar={config.avatar ?? ''}
            socialLinks={config.links?.filter((link) => link.type === 'icon')}
            pages={content.getPages()}
          />
        }
        trailing={collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
      />
    </>
  );
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};
