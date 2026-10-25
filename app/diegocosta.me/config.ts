import { repository } from '~/package.json';
import type { ConfigType } from '~/lib/config';

import { domainEnv, themeColor } from '~/lib/domain';

type LocalConfigType = ConfigType & {
  unsplash: {
    username: string;
    authorization: string;
  };
};

const domain = 'diegocosta.me';

const config: LocalConfigType = {
  author: 'Diego Costa',
  repository: repository.url,
  theme: {
    accentColor: themeColor('SITE_ACCENT_COLOR', domain),
    textColor: themeColor('SITE_TEXT_COLOR', domain),
    defaultTheme: 'dark',
  },
  title: 'config.title',
  description: 'config.description',
  domain,
  locales: ['en', 'pt', 'es'],
  jobTitle: ['Photographer'],
  avatar: '/avatar.jpg',
  unsplash: {
    username: domainEnv('UNSPLASH_USERNAME', domain),
    authorization: domainEnv('UNSPLASH_ACCESS_KEY', domain),
  },
  links: [
    {
      type: 'icon',
      icon: 'FaUnsplash',
      title: 'config.links.unsplash.title',
      href: 'https://unsplash.com/diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaInstagram',
      title: 'config.links.instagram.title',
      href: 'https://instagram.com/diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaEnvelope',
      title: 'config.links.mail.title',
      href: 'mailto:diego@diegocosta.me',
    },
    {
      type: 'icon',
      icon: 'FaIdBadge',
      title: 'config.links.personal.title',
      href: 'https://diegocoxta.com',
    },
  ],
};

export default config;
