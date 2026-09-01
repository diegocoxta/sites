'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LuHouse, LuMoon, LuNewspaper, LuNotepadText, LuPalette, LuSun, LuCodeXml, LuSunMoon } from 'react-icons/lu';

import type { BlogContentAttributes } from '~/lib/content';
import { useTranslator } from '~/components/TranslationProvider';

import _CommandBar from './CommandBar';

interface CommandBarProps {
  pages: Array<BlogContentAttributes>;
  posts: Array<BlogContentAttributes>;
  repository: string;
}

export type ExtendedAction = Action & Partial<BlogContentAttributes>;

export default function CommandBar({ pages, posts, repository }: CommandBarProps): React.ReactElement {
  const t = useTranslator();
  const { setTheme } = useTheme();
  const router = useRouter();

  const actions: Array<ExtendedAction> = [
    {
      id: 'home',
      name: t('client.components.commandBar.action.home'),
      section: t('client.components.commandBar.section.pages'),
      perform: () => router.push('/'),
      icon: <LuHouse size={18} />,
    },
    {
      id: 'blog',
      name: t('client.components.commandBar.action.blog'),
      section: t('client.components.commandBar.section.pages'),
      icon: <LuNewspaper size={18} />,
    },
    ...pages.map((p) => ({
      id: `page-${p.slug}`,
      name: p.title,
      section: t('client.components.commandBar.section.pages'),
      perform: () => router.push(`/${p.slug}`),
      icon: <LuNotepadText size={18} />,
      language: p.language,
    })),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      name: p.title,
      perform: () => router.push(`/blog/${p.slug}`),
      icon: <LuNewspaper size={18} />,
      parent: 'blog',
      language: p.language,
    })),
    {
      id: 'theme',
      name: t('client.components.commandBar.action.theme'),
      section: t('client.components.commandBar.section.preferences'),
      icon: <LuPalette size={18} />,
    },
    {
      id: 'theme-system',
      name: t('client.components.commandBar.action.themeSystem'),
      section: t('client.components.commandBar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('system'),
      icon: <LuSunMoon size={18} />,
    },
    {
      id: 'theme-light',
      name: t('client.components.commandBar.action.themeLight'),
      section: t('client.components.commandBar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <LuSun size={18} />,
    },
    {
      id: 'theme-dark',
      name: t('client.components.commandBar.action.themeDark'),
      section: t('client.components.commandBar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <LuMoon size={18} />,
    },
    {
      id: 'source',
      name: t('client.components.commandBar.action.source'),
      section: t('client.components.commandBar.section.tools'),
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
