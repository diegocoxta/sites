import type { ConfigType } from '~/lib/config';

const config: Pick<ConfigType, 'theme'> = {
  theme: {
    accentColor: `#${process.env.SITE_ACCENT_COLOR ?? 'e55242'}`,
    textColor: `#${process.env.SITE_TEXT_COLOR ?? '2f3d4f'}`,
  },
};

export default config;
