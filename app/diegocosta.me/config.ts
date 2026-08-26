import type { ConfigType } from '~/lib/config';

type LocalConfigType = ConfigType & {
  unsplash: {
    username?: string;
    authorization?: string;
  };
};

const profile: LocalConfigType = {
  title: 'Diego Costa',
  description: '',
  domain: 'diegocosta.me',
  author: 'Diego Costa',
  jobTitle: ['Photographer'],
  unsplash: {
    username: process.env.UNSPLASH_USERNAME,
    authorization: process.env.UNSPLASH_ACCESS_KEY,
  },
  links: [
    { type: 'text', href: 'https://diegocoxta.com', title: 'diegocosta.com' },
    { type: 'text', href: 'https://diegocosta.com.br', title: 'diegocosta.com.br' },
    { type: 'icon', icon: 'FaUnsplash', title: 'Unsplash', href: 'https://unsplash.com/diegocoxta' },
    { type: 'icon', icon: 'FaInstagram', title: 'Instagram', href: 'https://instagram.com/diegocoxta' },
    { type: 'icon', icon: 'FaTiktok', title: 'Tiktok', href: 'https://tiktok.com/@diegocoxta' },
    { type: 'icon', icon: 'FaYoutube', title: 'YouTube', href: 'https://youtube.com/@diegocoxta' },
  ],
};

export default profile;
