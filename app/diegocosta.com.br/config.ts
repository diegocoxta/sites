import { repository } from '~/package.json';
import type { ConfigType } from '~/lib/config';

import { themeColor } from '~/lib/domain';

const domain = 'diegocosta.com.br';

const config: ConfigType = {
  author: 'Diego Costa',
  repository: repository.url,
  theme: {
    accentColor: themeColor('SITE_ACCENT_COLOR', domain),
    textColor: themeColor('SITE_TEXT_COLOR', domain),
    defaultTheme: 'system',
  },
  title: 'Diego Costa',
  jobTitle: ['Engineering Manager', 'Senior Software Engineer'],
  description: 'config.description',
  domain,
  locales: ['pt'],
  avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
  links: [
    { type: 'text', title: 'config.links.blog.title', href: '/blog' },
    { type: 'text', title: 'config.links.cv.title', href: '/cv' },
    { type: 'text', title: 'E-mail', href: 'mailto:diego@diegocosta.com.br' },
    { type: 'text', title: 'LinkedIn', href: 'https://linkedin.com/in/diegocoxta' },
    { type: 'text', title: 'Github', href: 'https://github.com/diegocoxta' },
    { type: 'text', title: 'config.links.more.title', href: 'https://diegocoxta.com' },
  ],
};

export default config;
