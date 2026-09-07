import type { ConfigType } from '~/lib/config';

const config: Pick<ConfigType, 'theme' | 'author'> = {
  author: 'Diego Costa',
  theme: {
    accentColor: `#${process.env.SITE_ACCENT_COLOR ?? 'e55242'}`,
    textColor: `#${process.env.SITE_TEXT_COLOR ?? '2f3d4f'}`,
    defaultTheme: 'system',
  },
};

export default config;
