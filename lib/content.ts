import fs from 'node:fs';

import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';

import { publicPath } from '~/lib/public-path';
import type { ConfigType } from '~/lib/config';

export type ContentAttributes = {
  title: string;
  slug: string;
  content: string;
  readingTime: number;
  href?: string;
  summary?: string;
  status?: string;
  date?: string;
  language?: string;
  tags?: Array<string>;
  expanded?: string;
};

const isPublished = (entry: ContentAttributes): boolean => entry.status !== 'draft';

const byDateDesc = (a: ContentAttributes, b: ContentAttributes): number =>
  new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

function rewriteRelativeImages(content: string, dir: string): string {
  return content.replace(/!\[(.*?)\]\(\.\/([^)]+)\)/g, (_, alt, file) => `![${alt}](${dir}/${file})`);
}

function resolveContentFile(
  domain: string,
  filename: string,
  locale?: string,
  defaultLocale?: string
): string | undefined {
  const candidates = [
    locale && `index.${locale}.md`,
    defaultLocale && defaultLocale !== locale && `index.${defaultLocale}.md`,
    'index.md',
  ].filter((name): name is string => Boolean(name));

  for (const name of candidates) {
    const file = publicPath(domain, filename, name);

    if (fs.existsSync(file)) {
      return file;
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
  const file = resolveContentFile(domain, filename, locale, defaultLocale);

  if (!file) {
    return undefined;
  }

  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));

  const attributes: Record<string, unknown> = {
    ...data,
    readingTime: readingTime(content).minutes,
    content: rewriteRelativeImages(content, filename),
  };

  if (data.date) {
    attributes.date = new Date(data.date).toISOString().slice(0, 10);
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

const getPosts = cache((domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  listContent<ContentAttributes>(domain, '/blog', locale, defaultLocale)
    .filter(isPublished)
    .sort(byDateDesc)
    .map((p) => ({ ...p, href: `/blog/${p.slug}` }))
);

const getPages = cache((domain: string, defaultLocale: string, locale?: string): Array<ContentAttributes> =>
  listContent<ContentAttributes>(domain, '/pages', locale, defaultLocale)
    .filter(isPublished)
    .map((p) => ({ ...p, href: `/${p.slug}` }))
);

const getTags = cache((domain: string, defaultLocale: string, locale?: string): Array<string> => [
  ...new Set(getPosts(domain, defaultLocale, locale).flatMap((post) => post.tags ?? [])),
]);

export function contentFor({ domain, locales }: Pick<ConfigType, 'domain' | 'locales'>) {
  const [defaultLocale] = locales;

  return {
    readFile: <T extends ContentAttributes>(filename: string, locale?: string): T | undefined =>
      readContentFile<T>(domain, filename, locale, defaultLocale),
    getPages: (locale?: string) => getPages(domain, defaultLocale, locale),
    getPosts: (locale?: string) => getPosts(domain, defaultLocale, locale),
    getTags: (locale?: string) => getTags(domain, defaultLocale, locale),
  };
}
