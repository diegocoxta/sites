export type ConfigProps = {
  title: string;
  description: string;
  domain: string;
  author: string;
  avatar?: string;
  links?: Array<IconLinkProps | CardLinkProps | TextLinkProps>;
  jobTitle?: Array<string>;
};

type ConfigLinkProps = {
  title: string;
  href: string;
  description?: string;
  order?: number;
};

type TextLinkProps = ConfigLinkProps & {
  type: 'text';
  icon?: never;
  recentActivity?: never;
};

type IconLinkProps = ConfigLinkProps & {
  type: 'icon';
  icon: string;
  recentActivity?: never;
};

type CardLinkProps = ConfigLinkProps & {
  type: 'card';
  icon: string;
  recentActivity?: {
    widget: string;
    variables: Record<string, string | undefined>;
  };
};
