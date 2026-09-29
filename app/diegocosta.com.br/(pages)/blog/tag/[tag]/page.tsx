import type { Metadata } from 'next';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';

import { Breadcrumb, Article, FlashMessage } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface TagsSinglePageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagsSinglePage({ params }: TagsSinglePageProps) {
  const { tag } = await params;

  const t = getTranslations(config);

  return (
    <>
      <Breadcrumb items={[{ label: t('page.blog.title'), href: '/blog' }, { label: `#${tag}` }]} />
      <FlashMessage>{t('components.blog.flashmessage.message')}</FlashMessage>
      {content
        .getPosts()
        .filter((post) => post.tags?.includes(tag))
        .map((post, index: number) => (
          <Article key={`article-${index}`} t={t} expanded={false} {...post} />
        ))}
    </>
  );
}

export const generateStaticParams = () => content.getTags().map((tag) => ({ tag }));

export async function generateMetadata({ params }: TagsSinglePageProps): Promise<Metadata> {
  const { tag } = await params;
  const t = getTranslations(config);

  return {
    title: `#${tag}`,
    description: t('page.tag.description', { tag }),
    alternates: { canonical: `/blog/tag/${tag}` },
    robots: { index: false, follow: true },
  };
}
