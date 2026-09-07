import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { CollectionsCard, Markdown, Page, Profile } from '~/components/PhotoShowcase';

import config from '~/app/diegocosta.me/config';
import { getCollections } from '~/app/diegocosta.me/actions';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export function generateStaticParams() {
  return content.getAllPages().map(({ slug }) => ({ page: [slug] }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`);

  if (!doc) {
    return {};
  }

  const t = getTranslations(config);
  const image = config.avatar ?? '';

  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/${page[0]}` },
    openGraph: { siteName: t(config.title), url: `/${page[0]}`, images: [image] },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function MarkdownPage({ params }: PageProps) {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`);

  if (!doc) {
    notFound();
  }

  const t = getTranslations(config);
  const collections = await getCollections();

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
      <Markdown {...doc} />
    </Page>
  );
}
