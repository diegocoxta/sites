import type { MetadataRoute } from 'next';

import { createSitemap } from '~/lib/metadata';

import config from '~/app/diegocosta.com.br/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(config.domain);
}
