import type { Metadata } from 'next';

import { getTranslations } from '~/lib/i18n/messages';

import Linktree, { type LinktreeProps } from '~/components/Linktree';
import Username from '~/components/Username';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const t = getTranslations(config, locale);

  const icons = config.links?.filter((link) => link.type === 'icon');
  const cards = config.links?.filter((link) => link.type === 'card');

  return (
    <Linktree
      background={config.avatar}
      t={t}
      icons={icons as LinktreeProps['icons']}
      cards={cards as LinktreeProps['cards']}
    >
      <Username username={config.title} size={32} />
      <p className="bio">{t(config.description)}</p>
    </Linktree>
  );
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = getTranslations(config, locale);

  return {
    metadataBase: new URL(`https://${config.domain}`),
    title: {
      template: `%s | ${config.author} (${config.title})`,
      default: `${config.author} (${config.title})`,
    },
    description: t(config.description),
    alternates: {
      canonical: '/',
      languages: {
        ...Object.fromEntries(config.locales.map((loc) => [loc, `/${loc}`])),
      },
    },
  };
}
