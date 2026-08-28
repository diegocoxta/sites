import type { SupportedLanguageKey, MultiLanguageString } from '~/lib/lang';

export type ConfigType = {
  title: MultiLanguageString;
  description: MultiLanguageString;
  domain: string;
  author: string;
  avatar?: string;
  links?: Array<IconLinkType | CardLinkType | TextLinkType>;
  jobTitle?: Array<string>;
};

export type ConfigLinkType = {
  title: MultiLanguageString;
  href: string;
  description?: MultiLanguageString;
  order?: number;
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
  recentActivity?: RecentActivityType;
};

export type RecentActivityType = {
  widget: string;
  config: Record<string, MultiLanguageString | undefined>;
  lang?: SupportedLanguageKey;
};
