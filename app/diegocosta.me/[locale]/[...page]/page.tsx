import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { localizedAlternates } from '~/lib/i18n/alternates';
import { getTranslations } from '~/lib/i18n/messages';
import type { IconLinkType } from '~/lib/config';

import { CollectionsCard, Markdown, Page, Profile } from '~/components/diegocosta.me';

import config from '~/app/diegocosta.me/config';
import { getCollections } from '~/app/diegocosta.me/actions';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ locale: string; page: string[] }>;
}

export function generateStaticParams() {
  return content.getAllPages(config.locales[0]).map(({ slug }) => ({ page: [slug] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, locale);

  if (!doc) {
    return {};
  }

  const t = getTranslations(config, locale);
  const image = config.avatar ?? '';

  return {
    title: doc.title,
    description: doc.summary,
    alternates: localizedAlternates(config, locale, `/${page[0]}`),
    openGraph: { siteName: t(config.title), url: `/${locale}/${page[0]}`, images: [image] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function MarkdownPage({ params }: PageProps) {
  const { locale, page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, locale);

  if (!doc) {
    notFound();
  }

  const t = getTranslations(config, locale);
  const collections = await getCollections();

  return (
    <Page
      leading={
        <Profile
          t={t}
          name={config.author}
          avatar={config.avatar ?? ''}
          socialLinks={config.links?.filter((link): link is IconLinkType => link.type === 'icon' && !link.hide)}
          pages={content.getPages(locale)}
        />
      }
      trailing={collections.length > 0 && <CollectionsCard t={t} collections={collections} />}
    >
      <Markdown t={t} {...doc} />
    </Page>
  );
}
