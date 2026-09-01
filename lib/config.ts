import type { Locale } from '~/lib/i18n';

export type ConfigType = {
  title: string;
  description: string;
  domain: string;
  author: string;
  avatar?: string;
  links?: Array<IconLinkType | CardLinkType | TextLinkType>;
  jobTitle?: Array<string>;
  locales: readonly Locale[];
  theme: SiteThemeType;
};

export type ConfigLinkType = {
  title: string;
  href: string;
  description?: string;
};

export type TextLinkType = ConfigLinkType & {
  type: 'text';
  icon?: never;
  recentActivity?: never;
};

export type IconLinkType = ConfigLinkType & {
  type: 'icon';
  icon: string;
  recentActivity?: never;
};

export type CardLinkType = ConfigLinkType & {
  type: 'card';
  icon: string;
  highlight?: boolean;
  recentActivity?: RecentActivityType;
};

export type RecentActivityType = {
  widget: string;
  config: Record<string, string | undefined>;
};

export type SiteType = Pick<ConfigType, 'domain' | 'locales'>;

export type SiteThemeType = {
  accentColor: string;
  textColor: string;
};
