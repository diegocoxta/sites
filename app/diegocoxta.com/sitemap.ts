import type { MetadataRoute } from 'next';

import { createSitemap } from '~/app/metadata';

import config from '~/app/diegocoxta.com/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(config.domain);
}
