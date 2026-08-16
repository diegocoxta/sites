import { createManifest } from '~/lib/metadata';

import config from '~/app/diegocoxta.com/config';

export const GET = () =>
  createManifest({
    name: config.title,
    description: config.description,
  });
