import type { Metadata } from 'next';

import { getLocatedString, SUPPORTED_LANGUAGES, type SupportedLanguageKey } from '~/lib/lang';

import Linktree, { type LinktreeProps } from '~/components/Linktree';
import Username from '~/components/Username';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

interface LocatedHomePageProps {
  params: Promise<{ lang: SupportedLanguageKey }>;
}

export default async function LocatedHomePage({ params }: LocatedHomePageProps) {
  const { lang } = await params;

  const icons = config.links?.filter((l) => l.type === 'icon');
  const cards = config.links?.filter((l) => l.type === 'card');

  return (
    <Linktree
      background={config.avatar}
      icons={icons as LinktreeProps['icons']}
      cards={cards as LinktreeProps['cards']}
      lang={lang}
    >
      <Username username={getLocatedString(config.title, lang)} size={32} />
      <p className="bio">{getLocatedString(config.description, lang)}</p>
    </Linktree>
  );
}

export const generateStaticParams = () => SUPPORTED_LANGUAGES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LocatedHomePageProps): Promise<Metadata> {
  const { lang } = await params;

  return {
    metadataBase: `https://${config.domain}`,
    title: {
      template: `%s | ${config.author} (${getLocatedString(config.title, lang)})`,
      default: `${config.author} (${getLocatedString(config.title, lang)})`,
    },
    description: getLocatedString(config.description, lang),
    alternates: {
      canonical: '/',
    },
  };
}
