'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LuHouse, LuMoon, LuNewspaper, LuNotepadText, LuPalette, LuSun, LuCodeXml, LuSunMoon } from 'react-icons/lu';

import type { ContentAttributes } from '~/lib/content';

import { useTranslator } from '~/components/shared/TranslationProvider';

import _CommandBar from './CommandBar';

type ContentAction = Pick<ContentAttributes, 'href' | 'title' | 'language'>;

interface CommandBarProps {
  content: Array<ContentAction>;
  repository: string;
}

export type ExtendedAction = Action & Partial<ContentAction>;

export default function CommandBar({ content, repository }: CommandBarProps) {
  const t = useTranslator();
  const { setTheme } = useTheme();
  const router = useRouter();

  const actions: Array<ExtendedAction> = [
    {
      id: 'home',
      name: t('components.commandbar.action.home'),
      section: t('components.commandbar.section.pages'),
      perform: () => router.push('/'),
      icon: <LuHouse size={18} />,
    },
    {
      id: 'blog',
      name: t('components.commandbar.action.blog'),
      section: t('components.commandbar.section.pages'),
      icon: <LuNewspaper size={18} />,
    },
    ...content.map((p) => {
      const isPost = p.href.startsWith('/blog/');

      return {
        id: `item-${p.href}`,
        name: p.title,
        section: isPost ? undefined : t('components.commandbar.section.pages'),
        perform: () => router.push(p.href),
        icon: isPost ? <LuNewspaper size={18} /> : <LuNotepadText size={18} />,
        parent: isPost ? 'blog' : undefined,
        language: p.language,
      };
    }),
    {
      id: 'theme',
      name: t('components.commandbar.action.theme'),
      section: t('components.commandbar.section.preferences'),
      icon: <LuPalette size={18} />,
    },
    {
      id: 'theme-system',
      name: t('components.commandbar.action.themesystem'),
      section: t('components.commandbar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('system'),
      icon: <LuSunMoon size={18} />,
    },
    {
      id: 'theme-light',
      name: t('components.commandbar.action.themelight'),
      section: t('components.commandbar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('default'),
      icon: <LuSun size={18} />,
    },
    {
      id: 'theme-dark',
      name: t('components.commandbar.action.themedark'),
      section: t('components.commandbar.section.theme'),
      parent: 'theme',
      perform: () => setTheme('dark'),
      icon: <LuMoon size={18} />,
    },
    {
      id: 'source',
      name: t('components.commandbar.action.source'),
      section: t('components.commandbar.section.tools'),
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
