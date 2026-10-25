import fs from 'node:fs';

import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';

import { publicPath } from '~/lib/domain';
import type { ConfigType } from '~/lib/config';

export type ContentAttributes = {
  title: string;
  slug: string;
  content: string;
  readingTime: number;
  href: string;
  kicker?: string;
  summary?: string;
  date?: string;
  language?: string;
  tags?: Array<string>;
  expanded?: boolean;
  listed?: boolean;
};

const isListed = (entry: ContentAttributes): boolean => entry.listed !== false;

const byDateDesc = (a: ContentAttributes, b: ContentAttributes): number =>
  new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

function rewriteRelativeImages(content: string, dir: string): string {
  return content.replace(/!\[(.*?)\]\(\.\/([^)]+)\)/g, (_, alt, file) => `![${alt}](${dir}/${file})`);
}

const LOCALE_BLOCK = /\{start locale:(\w+)\}\r?\n([\s\S]*?)\r?\n\{end locale:\1\}[ \t]*\r?\n?/g;

function selectLocaleBlocks(content: string, locale?: string, defaultLocale?: string): string {
  const available = new Set([...content.matchAll(LOCALE_BLOCK)].map(([, name]) => name));

  if (available.size === 0) {
    return content;
  }

  const chosen = locale && available.has(locale) ? locale : defaultLocale;

  return content
    .replace(LOCALE_BLOCK, (_, name: string, body: string) => (name === chosen ? `${body}\n` : ''))
    .replace(/\n{3,}/g, '\n\n');
}

function localizeValue(value: unknown, locale?: string, defaultLocale?: string): unknown {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return value;
  }

  const byLocale = value as Record<string, unknown>;

  return (locale && byLocale[locale]) ?? (defaultLocale && byLocale[defaultLocale]);
}

function resolveContentName(
  domain: string,
  filename: string,
  locale?: string,
  defaultLocale?: string
): string | undefined {
  const candidates = [
    locale && `index.${locale}`,
    defaultLocale && defaultLocale !== locale && `index.${defaultLocale}`,
    'index',
  ]
    .filter((name): name is string => Boolean(name))
    .flatMap((name) => [`${name}.mdx`, `${name}.md`]);

  for (const name of candidates) {
    if (fs.existsSync(publicPath(domain, filename, name))) {
      return name;
    }
  }

  return undefined;
}

const readContentFile = cache(function readContentFile<T extends ContentAttributes>(
  domain: string,
  filename: string,
  locale?: string,
  defaultLocale?: string
): T | undefined {
  const name = resolveContentName(domain, filename, locale, defaultLocale);

  if (!name) {
    return undefined;
  }

  const file = publicPath(domain, filename, name);

  // gray-matter returns a cached `data` object, so the localized fields below are set on a copy
  let data: Record<string, unknown>;
  let content: string;

  try {
    ({ data, content } = matter(fs.readFileSync(file, 'utf-8')));
  } catch (error) {
    console.error('[content] failed to parse %s', file, error);
    return undefined;
  }

  data = { ...data };

  for (const key of ['title', 'kicker', 'summary']) {
    if (key in data) {
      data[key] = localizeValue(data[key], locale, defaultLocale);
    }
  }

  if (typeof data.title !== 'string' || data.title.length === 0) {
    console.warn('[content] skipping %s: missing "title" in front matter', file);
    return undefined;
  }

  const body = selectLocaleBlocks(content, locale, defaultLocale);

  const attributes: Record<string, unknown> = {
    ...data,
    listed: data.listed !== false,
    readingTime: readingTime(body).minutes,
    content: rewriteRelativeImages(body, filename),
  };

  if (data.date) {
    attributes.date = new Date(data.date as string).toISOString().slice(0, 10);
  }

  return attributes as T;
});

const listContent = cache(function listContent<T extends ContentAttributes>(
  domain: string,
  dir: string,
  locale?: string,
  defaultLocale?: string
): Array<T> {
  const root = publicPath(domain, dir);

  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root)
    .map((slug) => {
      const file = readContentFile<T>(domain, `${dir}/${slug}`, locale, defaultLocale);

      return file ? { ...file, slug } : undefined;
    })
    .filter((entry): entry is T => entry !== undefined);
});

const getAllPosts = cache((domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  listContent<ContentAttributes>(domain, '/blog', locale, defaultLocale)
    .sort(byDateDesc)
    .map((post) => ({ ...post, href: `/blog/${post.slug}` }))
);

const getAllPages = cache((domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  listContent<ContentAttributes>(domain, '/pages', locale, defaultLocale).map((page) => ({
    ...page,
    href: `/${page.slug}`,
  }))
);

const getPosts = (domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  getAllPosts(domain, defaultLocale, locale).filter(isListed);

const getPages = (domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  getAllPages(domain, defaultLocale, locale).filter(isListed);

const getTags = cache((domain: string, defaultLocale: string, locale?: string): Array<string> => [
  ...new Set(getPosts(domain, defaultLocale, locale).flatMap((post) => post.tags ?? [])),
]);

export function contentFor({ domain, locales }: Pick<ConfigType, 'domain' | 'locales'>) {
  const [defaultLocale] = locales;

  return {
    readFile: <T extends ContentAttributes>(filename: string, locale?: string): T | undefined =>
      readContentFile<T>(domain, filename, locale, defaultLocale),
    getPages: (locale?: string) => getPages(domain, defaultLocale, locale),
    getAllPages: (locale?: string) => getAllPages(domain, defaultLocale, locale),
    getPosts: (locale?: string) => getPosts(domain, defaultLocale, locale),
    getAllPosts: (locale?: string) => getAllPosts(domain, defaultLocale, locale),
    getTags: (locale?: string) => getTags(domain, defaultLocale, locale),
  };
}
