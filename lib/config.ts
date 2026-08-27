export const SUPPORTED_LANGUAGES = ['en', 'es', 'pt'] as const;

type SupportedLanguageKey = (typeof SUPPORTED_LANGUAGES)[number];
type MultiLanguageString = string | Record<SupportedLanguageKey, string>;

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
  props: Record<string, MultiLanguageString | undefined>;
};
