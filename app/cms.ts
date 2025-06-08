import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';

export { default as profile } from '~/public/content/profile';

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

export const readFile = cache(function readFile<T extends ContentAttributes>(filename: string): T | undefined {
  const file = path.join(process.cwd(), 'public', 'content', filename, 'index.mdx');

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

  return { ...data, content: updateContentImagePaths(content, filename) } as T;
});

function getFileList<T extends ContentAttributes>(dir: string): Array<T> {
  return fs.readdirSync(path.join(process.cwd(), 'public', 'content', dir)).map((slug) => ({
    ...readFile<T>(`${dir}/${slug}`)!,
    slug,
  }));
}

function updateContentImagePaths(bodyContent: string, dirname: string) {
  return bodyContent.replace(/!\[(.*?)\]\(\.\/([^)]+)\)/g, (_, altText, fileName) => {
    return `![${altText}](${dirname}/${fileName})`;
  });
}

export const getPages = cache(function getPages() {
  return getFileList('pages').filter((post) => post.status !== 'draft');
});

export const getPosts = cache(function getPosts() {
  return getFileList<BlogContentAttributes>('posts')
    .filter((post) => post.status !== 'draft')
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
});

export const getTags = cache(function getTags() {
  return getFileList<BlogContentAttributes>('posts')
    .filter((post) => post.status !== 'draft')
    .map((post) => post.tags)
    .flat(Infinity);
});
