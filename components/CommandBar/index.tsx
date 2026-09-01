'use client';

import { KBarProvider, type Action } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LuHouse, LuMoon, LuNewspaper, LuNotepadText, LuPalette, LuSun, LuCodeXml, LuSunMoon } from 'react-icons/lu';

import type { ContentAttributes } from '~/lib/content';
import { useTranslator } from '~/components/TranslationProvider';

import _CommandBar from './CommandBar';

type ContentAction = Pick<ContentAttributes, 'href' | 'title' | 'language'>;

interface CommandBarProps {
  content: Array<ContentAction>;
  repository: string;
}

export type ExtendedAction = Action & Partial<ContentAction>;

export default function CommandBar({ content, repository }: CommandBarProps): React.ReactElement {
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
    ...content.map((p) => {
      const isPost = p.href.startsWith('/blog/');

      return {
        id: `item-${p.href}`,
        name: p.title,
        section: isPost ? undefined : t('client.components.commandBar.section.pages'),
        perform: () => router.push(p.href),
        icon: isPost ? <LuNewspaper size={18} /> : <LuNotepadText size={18} />,
        parent: isPost ? 'blog' : undefined,
        language: p.language,
      };
    }),
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
