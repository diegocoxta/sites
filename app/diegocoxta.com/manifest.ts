import { MetadataRoute } from 'next';

import * as envs from '~/lib/envs';

import config from '~/app/diegocoxta.com/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: config.title,
    short_name: config.title,
    description: config.description,
    start_url: '/',
    display: 'standalone',
    theme_color: envs.SITE_ACCENT_COLOR,
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
