import { MetadataRoute } from 'next';

import config from '~/app/diegocosta.com.br/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${config.domain}/sitemap.xml`,
  };
}
