'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { LuHouse, LuMoon, LuNewspaper, LuNotepadText, LuPalette, LuSun, LuCodeXml, LuSunMoon } from 'react-icons/lu';

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
      icon: <LuHouse size={18} />,
    },
    {
      id: 'blog',
      name: 'Blog',
      shortcut: ['g', 'a'],
      section: 'Páginas',
      icon: <LuNewspaper size={18} />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      section: 'Páginas',
      perform: () => router.push(`/${p.slug}`),
      icon: <LuNotepadText size={18} />,
    })),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      name: p.title + p.title + p.title,
      perform: () => router.push(`/blog/${p.slug}`),
      icon: <LuNewspaper size={18} />,
      parent: 'blog',
    })),
    {
      id: 'theme',
      name: 'Tema',
      shortcut: ['g', 't'],
      section: 'Preferências',
      icon: <LuPalette size={18} />,
    },
    {
      id: 'theme-system',
      name: 'Acompanhar o sistema',
      shortcut: ['g', 't', 's'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('system'),
      icon: <LuSunMoon size={18} />,
    },
    {
      id: 'theme-light',
      name: 'Claro',
      shortcut: ['g', 't', 'l'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <LuSun size={18} />,
    },
    {
      id: 'theme-dark',
      name: 'Escuro',
      shortcut: ['g', 't', 'd'],
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <LuMoon size={18} />,
    },
    {
      id: 'source',
      name: 'Código Fonte',
      shortcut: ['g', 's'],
      section: 'Ferramentas',
      perform: () => window.open(repository, '_blank'),
      icon: <LuCodeXml />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <_CommandBar />
    </KBarProvider>
  );
}
