import type { ConfigType } from '~/lib/config';

import globalConfig from '~/app/config';

type LocalConfigType = ConfigType & {
  unsplash: {
    username?: string;
    authorization?: string;
  };
};

const config: LocalConfigType = {
  ...globalConfig,
  title: 'config.title',
  description: 'config.description',
  domain: 'diegocosta.me',
  locales: ['en'],
  author: 'Diego Costa',
  jobTitle: ['Photographer'],
  unsplash: {
    username: process.env.UNSPLASH_USERNAME,
    authorization: process.env.UNSPLASH_ACCESS_KEY,
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
      icon: 'FaTiktok',
      title: 'config.links.tiktok.title',
      href: 'https://tiktok.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaYoutube',
      title: 'config.links.youtube.title',
      href: 'https://youtube.com/@diegocoxta',
    },
  ],
};

export default config;
