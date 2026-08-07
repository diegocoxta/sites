'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { Home, Moon, Newspaper, NotepadText, Palette, Sun, CodeXml } from 'lucide-react';
import { useTheme } from 'next-themes';

import type { BlogContentAttributes } from '~/lib/cms';

import _CommandBar from './CommandBar';

interface CommandBarProps {
  pages: Array<BlogContentAttributes>;
  posts: Array<BlogContentAttributes>;
  repository: string;
}

export default function CommandBar({ pages, posts, repository }: CommandBarProps): React.ReactElement {
  const { setTheme } = useTheme();
  const router = useRouter();

  const actions: Array<Action> = [
    {
      id: 'home',
      name: 'Página Inicial',
      shortcut: ['g', 'h'],
      section: 'Páginas',
      perform: () => router.push('/'),
      icon: <Home size={18} />,
    },
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['g', 'a'],
      section: 'Páginas',
      icon: <Newspaper size={18} />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      section: 'Páginas',
      perform: () => router.push(`/${p.slug}`),
      icon: <NotepadText size={18} />,
    })),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      name: p.title + p.title + p.title,
      perform: () => router.push(`/blog/${p.slug}`),
      icon: <Newspaper size={18} />,
      parent: 'blog',
    })),
    {
      id: 'theme',
      name: 'Tema',
      shortcut: ['g', 't'],
      section: 'Preferências',
      icon: <Palette size={18} />,
    },
    {
      id: 'theme-light',
      name: 'Claro',
      shortcut: ['g', 't', 'l'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <Sun size={18} />,
    },
    {
      id: 'theme-dark',
      name: 'Escuro',
      shortcut: ['g', 't', 'd'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <Moon size={18} />,
    },
    {
      id: 'source',
      name: 'Código Fonte',
      shortcut: ['g', 's'],
      section: 'Ferramentas',
      perform: () => window.open(repository, '_blank'),
      icon: <CodeXml />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <_CommandBar />
    </KBarProvider>
  );
}
