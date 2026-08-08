import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';

export const getProfile = cache(function getProfile(site: string) {
  const content = fs.readFileSync(`./public/${site}/profile.js`, 'utf-8');
  const profile = JSON.parse(content);

  return profile;
});

export type ContentAttributes = {
  title: string;
  slug: string;
  content: string;
  readingTime: number;
  summary?: string;
  status?: string;
};

export type BlogContentAttributes = ContentAttributes & {
  date?: string;
  language?: string;
  tags?: Array<string>;
  expanded?: string;
};

export const readFile = cache(function readFile<T extends ContentAttributes>(
  site: string,
  filename: string
): T | undefined {
  const file = path.join(process.cwd(), 'public', site, filename, 'index.mdx');

  if (!fs.existsSync(file)) {
    return undefined;
  }

  const { data, content } = matter(fs.readFileSync(file, 'utf-8'));

  if (data.date) {
    data.date = new Date(data.date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  data.readingTime = readingTime(content).minutes;

  return { ...data, content: updateContentImagePaths(content, site, filename) } as T;
});

function getFileList<T extends ContentAttributes>(site: string, dir: string): Array<T> {
  const fileDir = path.join(process.cwd(), 'public', site, dir);

  if (!fs.existsSync(fileDir)) {
    return [];
  }

  return fs.readdirSync(fileDir).map((slug) => ({
    ...readFile<T>(site, `${dir}/${slug}`)!,
    slug,
  }));
}

function updateContentImagePaths(bodyContent: string, site: string, dirname: string) {
  return bodyContent.replace(/!\[(.*?)\]\(\.\/([^)]+)\)/g, (_, altText, fileName) => {
    return `![${altText}](/${site}${dirname}/${fileName})`;
  });
}

export const getPages = cache(function getPages(site: string) {
  return getFileList(site, `/pages`).filter((post) => post.status !== 'draft');
});

export const getPosts = cache(function getPosts(site: string) {
  return getFileList<BlogContentAttributes>(site, `/posts`)
    .filter((post) => post.status !== 'draft')
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
});

export const getTags = cache(function getTags(site: string) {
  return getFileList<BlogContentAttributes>(site, `/posts`)
    .filter((post) => post.status !== 'draft')
    .map((post) => post.tags)
    .flat(Infinity);
});
