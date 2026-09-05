import type { Metadata } from 'next';

import { getTranslations } from '~/lib/i18n/messages';

import type { CardLinkType, IconLinkType } from '~/lib/config';

import LinkHub from '~/components/LinkHub';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const t = getTranslations(config, locale);

  const icons = config.links?.filter((link): link is IconLinkType => link.type === 'icon') ?? [];
  const cards = config.links?.filter((link): link is CardLinkType => link.type === 'card') ?? [];

  return (
    <LinkHub
      t={t}
      username={config.title}
      description={config.description}
      background={config.avatar}
      icons={icons}
      cards={cards}
    />
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
