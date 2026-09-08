import { readFileSync } from 'fs';
import { join } from 'path';

import { getTranslations } from '~/lib/i18n/messages';
import { renderOgImage } from '~/lib/app-image';

import config from '~/app/diegocosta.me/config';
import { getAllPhotos, getCollection, getCollections, getPhotoContext } from '~/app/diegocosta.me/actions';

export const dynamic = 'force-static';

export function loadThumbnail(domain: string, src: string | undefined): string | undefined {
  if (!src) {
    return undefined;
  }

  if (src.startsWith('http')) {
    return src;
  }

  try {
    const bytes = readFileSync(join(process.cwd(), 'public', domain, src));
    return `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  const [photos, collections] = await Promise.all([getAllPhotos(), getCollections()]);

  return [
    { slug: ['home'] },
    ...photos.map((photo) => ({ slug: ['p', photo.id] })),
    ...collections.map((collection) => ({ slug: ['c', collection.id] })),
  ];
}

type Card = Pick<Parameters<typeof renderOgImage>[0], 'title' | 'meta' | 'thumbnail' | 'thumbnailColor'>;

async function resolveCard(slug: string[]): Promise<Card | null> {
  const [kind, id] = slug;
  const t = getTranslations(config);

  if (kind === 'home' && !id) {
    return {
      title: t(config.description),
      meta: [config.jobTitle?.join(', '), config.domain].filter(Boolean).join('  ·  '),
      thumbnail: loadThumbnail(config.domain, config.avatar),
    };
  }

  if (kind === 'p' && id) {
    const context = await getPhotoContext(id);

    if (!context) {
      return null;
    }

    const { photo, index, total } = context;
    const counter = t('page.photos.counter', { index: index + 1, total });

    return {
      title: photo.description || photo.alt || counter,
      meta: [counter, config.domain].join('  ·  '),
      thumbnail: photo.thumbnailSrc,
      thumbnailColor: photo.placeholderColor ?? undefined,
    };
  }

  if (kind === 'c' && id) {
    const collection = await getCollection(id);

    if (!collection?.coverSrc) {
      return null;
    }

    return {
      title: collection.title,
      meta: [
        t('components.photoshowcase.collectiondetails.photocount', { count: collection.photoCount }),
        config.domain,
      ].join('  ·  '),
      thumbnail: collection.coverSrc,
    };
  }

  return null;
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const card = await resolveCard((await params).slug);

  if (!card) {
    return new Response(null, { status: 404 });
  }

  return renderOgImage({ author: config.author, accentColor: config.theme.accentColor, ...card });
}
