import { contentFor } from '~/lib/content';
import { getTranslations } from '~/lib/i18n/messages';
import { renderOgImage } from '~/lib/app-image';

import config from '~/app/diegocosta.com.br/config';

const content = contentFor(config);

export const dynamic = 'force-static';

export function generateStaticParams() {
  return content.getAllPosts().map(({ slug: post }) => ({ post }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ post: string }> }) {
  const { post } = await params;
  const doc = content.readFile(`/blog/${post}`);
  const t = getTranslations(config);

  return renderOgImage({
    author: config.author,
    title: doc?.title ?? config.title,
    meta: [doc?.date && t.date(doc.date), config.domain].filter(Boolean).join('  ·  '),
    accentColor: config.theme.accentColor,
  });
}
