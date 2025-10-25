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
  repository: string;
}

export default function CommandBar({ pages, repository }: CommandBarProps): React.ReactElement {
  const { setTheme } = useTheme();

  const actions: Array<Action> = [
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      section: 'Pages',
      perform: () => window.location.replace('/'),
      icon: <BsFillHouseFill />,
    },
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['g', 'a'],
      section: 'Pages',
      icon: <BsNewspaper />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      perform: () => redirect(p.date ? `/blog/${p.slug}` : `/${p.slug}`),
      icon: <BsFillFileEarmarkFill />,
      parent: p.date ? 'blog' : undefined,
    })),
    {
      id: 'theme',
      name: 'Appearance',
      shortcut: ['g', 't'],
      section: 'Preferences',
      icon: <BsBrushFill />,
    },
    {
      id: 'theme-light',
      name: 'Light',
      shortcut: ['g', 't', 'l'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <BsSun />,
    },
    {
      id: 'theme-dark',
      name: 'Dark',
      shortcut: ['g', 't', 'd'],
      section: 'Appearance',
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <BsMoon />,
    },
    {
      id: 'source',
      name: 'Source Code',
      shortcut: ['g', 's'],
      section: 'Tools',
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
