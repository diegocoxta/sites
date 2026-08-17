'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LuHouse, LuMoon, LuNewspaper, LuNotepadText, LuPalette, LuSun, LuCodeXml, LuSunMoon } from 'react-icons/lu';

import type { BlogContentAttributes } from '~/lib/md';

import _CommandBar from './CommandBar';

interface CommandBarProps {
  pages: Array<BlogContentAttributes>;
  posts: Array<BlogContentAttributes>;
  repository: string;
}

export type ExtendedAction = Action & Partial<BlogContentAttributes>;

export default function CommandBar({ pages, posts, repository }: CommandBarProps): React.ReactElement {
  const { setTheme } = useTheme();
  const router = useRouter();

  const actions: Array<ExtendedAction> = [
    {
      id: 'home',
      name: 'Página Inicial',
      section: 'Páginas',
      perform: () => router.push('/'),
      icon: <LuHouse size={18} />,
    },
    {
      id: 'blog',
      name: 'Blog',
      section: 'Páginas',
      icon: <LuNewspaper size={18} />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      section: 'Páginas',
      perform: () => router.push(`/${p.slug}`),
      icon: <LuNotepadText size={18} />,
      language: p.language,
    })),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      name: p.title + p.title + p.title,
      perform: () => router.push(`/blog/${p.slug}`),
      icon: <LuNewspaper size={18} />,
      parent: 'blog',
      language: p.language,
    })),
    {
      id: 'theme',
      name: 'Tema',
      section: 'Preferências',
      icon: <LuPalette size={18} />,
    },
    {
      id: 'theme-system',
      name: 'Automático',
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('system'),
      icon: <LuSunMoon size={18} />,
    },
    {
      id: 'theme-light',
      name: 'Claro',
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <LuSun size={18} />,
    },
    {
      id: 'theme-dark',
      name: 'Escuro',
      section: 'Tema',
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <LuMoon size={18} />,
    },
    {
      id: 'source',
      name: 'Código Fonte',
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
