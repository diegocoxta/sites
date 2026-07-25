'use client';

import { KBarProvider, type Action } from 'kbar';
import { useTheme } from 'next-themes';
import {
  BsFillHouseFill,
  BsNewspaper,
  BsBrushFill,
  BsSun,
  BsMoon,
  BsCodeSlash,
  BsFillFileEarmarkFill,
} from 'react-icons/bs';
import { redirect } from 'next/navigation';

import type { BlogContentAttributes } from '~/app/cms';

import _CommandBar from './CommandBar';

interface CommandBarProps {
  pages: Array<BlogContentAttributes>;
  posts: Array<BlogContentAttributes>;
  repository: string;
}

export default function CommandBar({ pages, posts, repository }: CommandBarProps): React.ReactElement {
  const { setTheme } = useTheme();

  const actions: Array<Action> = [
    {
      id: 'home',
      name: 'Página Inicial',
      shortcut: ['g', 'h'],
      section: 'Páginas',
      perform: () => window.location.replace('/'),
      icon: <BsFillHouseFill />,
    },
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['g', 'a'],
      section: 'Páginas',
      icon: <BsNewspaper />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      section: 'Páginas',
      perform: () => redirect(`/${p.slug}`),
      icon: <BsFillFileEarmarkFill />,
    })),
    {
      id: 'post-list',
      name: 'Todas as publicações',
      parent: 'blog',
      icon: <BsNewspaper />,
      perform: () => redirect('/blog'),
    },
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      name: p.title + p.title + p.title,
      perform: () => redirect(`/blog/${p.slug}`),
      icon: <BsFillFileEarmarkFill />,
      parent: 'blog',
    })),
    {
      id: 'theme',
      name: 'Tema',
      shortcut: ['g', 't'],
      section: 'Preferências',
      icon: <BsBrushFill />,
    },
    {
      id: 'theme-light',
      name: 'Claro',
      shortcut: ['g', 't', 'l'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <BsSun />,
    },
    {
      id: 'theme-dark',
      name: 'Escuro',
      shortcut: ['g', 't', 'd'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <BsMoon />,
    },
    {
      id: 'source',
      name: 'Código Fonte',
      shortcut: ['g', 's'],
      section: 'Ferramentas',
      perform: () => window.open(repository, '_blank'),
      icon: <BsCodeSlash />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <_CommandBar />
    </KBarProvider>
  );
}
