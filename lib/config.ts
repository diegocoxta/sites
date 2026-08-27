export type ConfigType = {
  title: string;
  description: string;
  domain: string;
  author: string;
  avatar?: string;
  links?: Array<IconLinkType | CardLinkType | TextLinkType>;
  jobTitle?: Array<string>;
};

export type ConfigLinkType = {
  title: string;
  href: string;
  description?: string;
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
  highlight?: boolean;
  recentActivity?: RecentActivityType;
};

export type RecentActivityType = {
  widget: string;
  props: Record<string, string | undefined>;
};
