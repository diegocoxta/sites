import type { Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { localizedAlternates } from '~/lib/i18n/alternates';
import { getTranslations } from '~/lib/i18n/messages';
import type { IconLinkType } from '~/lib/config';

import { CollectionsCard, Feed, Profile } from '~/components/diegocosta.me';

import config from '~/app/diegocosta.me/config';
import { getCollections, getPhotosPage } from '~/app/diegocosta.me/actions';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = getTranslations(config, locale);
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
        hrefBase={`/${t.locale}/p`}
        leading={
          <Profile
            t={t}
            name={config.author}
            avatar={config.avatar ?? ''}
            socialLinks={config.links?.filter((link): link is IconLinkType => link.type === 'icon' && !link.hide)}
            pages={content.getPages(locale)}
            locales={config.locales}
            path={''}
          />
        }
        trailing={collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
      />
    </>
  );
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return { alternates: localizedAlternates(config, locale) };
}
