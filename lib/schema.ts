import type { BlogPosting, BreadcrumbList, ImageObject, ListItem, Person, WebSite, WithContext } from 'schema-dts';

import type { ContentAttributes } from '~/lib/content';
import type { ConfigType } from '~/lib/config';

const CONTEXT = 'https://schema.org' as const;

const origin = (config: ConfigType) => `https://${config.domain}`;

/** schema.org `Person` for a domain, built from its config. */
export function personLd(config: ConfigType): WithContext<Person> {
  const { author, avatar, links, jobTitle } = config;

  return {
    '@context': CONTEXT,
    '@type': 'Person',
    name: author,
    image: avatar && (avatar.startsWith('http') ? avatar : `${origin(config)}${avatar}`),
    url: origin(config),
    email: links?.find((link) => link.href.startsWith('mailto:'))?.href.replace('mailto:', ''),
    jobTitle,
    sameAs: links?.filter((link) => link.href.startsWith('http')).map((link) => link.href),
  };
}

/** schema.org `WebSite`. `name` is passed in already resolved (translated / composed). */
export function websiteLd(config: ConfigType, name: string): WithContext<WebSite> {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    name,
    url: origin(config),
    inLanguage: config.locales.length > 1 ? [...config.locales] : config.locales[0],
  };
}

type PostDoc = Pick<ContentAttributes, 'title' | 'summary' | 'date' | 'tags'>;

/** schema.org `BlogPosting` for a post at `path` (leading slash, no origin). */
export function blogPostingLd(config: ConfigType, doc: PostDoc, path: string): WithContext<BlogPosting> {
  const url = `${origin(config)}${path}`;

  return {
    '@context': CONTEXT,
    '@type': 'BlogPosting',
    headline: doc.title,
    description: doc.summary,
    datePublished: doc.date,
    author: { '@type': 'Person', name: config.author, url: origin(config) },
    publisher: { '@type': 'Person', name: config.author },
    mainEntityOfPage: url,
    image: `${url}/og`,
    inLanguage: config.locales[0],
  };
}

/** schema.org `BreadcrumbList`. The last crumb usually omits `url` (it's the current page). */
export function breadcrumbLd(crumbs: Array<{ name: string; url?: string }>): WithContext<BreadcrumbList> {
  const itemListElement: ListItem[] = crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    ...(crumb.url ? { item: { '@id': crumb.url } } : {}),
  }));

  return { '@context': CONTEXT, '@type': 'BreadcrumbList', itemListElement };
}

type PhotoNode = { id: string; src: string; width: number; height: number };

/** schema.org `ImageObject` for a single photo page. */
export function imageObjectLd(config: ConfigType, photo: PhotoNode, name: string): WithContext<ImageObject> {
  return {
    '@context': CONTEXT,
    '@type': 'ImageObject',
    name,
    contentUrl: photo.src,
    thumbnailUrl: photo.src,
    width: `${photo.width}`,
    height: `${photo.height}`,
    creator: { '@type': 'Person', name: config.author },
    mainEntityOfPage: `${origin(config)}/p/${photo.id}`,
  };
}
