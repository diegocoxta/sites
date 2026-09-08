import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';
import { blogPostingLd, breadcrumbLd } from '~/lib/schema';

import JsonLd from '~/components/JsonLd';
import { Container, Article } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

interface BlogPostPageProps {
  params: Promise<{ post: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { post } = await params;

  const t = getTranslations(config);
  const doc = content.readFile(`/blog/${post}`);

  if (!doc) {
    notFound();
  }

  return (
    <Container>
      <JsonLd data={blogPostingLd(config, doc, `/blog/${post}`)} />
      <JsonLd
        data={breadcrumbLd([
          { name: config.title, url: `https://${config.domain}` },
          { name: t('page.blog.title'), url: `https://${config.domain}/blog` },
          { name: doc.title },
        ])}
      />
      <Article t={t} headingLevel={1} {...doc} />
    </Container>
  );
}

export const generateStaticParams = () => content.getAllPosts().map(({ slug: post }) => ({ post }));

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { post } = await params;
  const doc = content.readFile(`/blog/${post}`);

  if (!doc) {
    notFound();
  }

  const path = `/blog/${post}`;
  const ogImage = `${path}/og`;

  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: doc.title,
      description: doc.summary,
      url: path,
      publishedTime: doc.date,
      authors: [config.author],
      tags: doc.tags,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: doc.title, description: doc.summary, images: [ogImage] },
  };
}
