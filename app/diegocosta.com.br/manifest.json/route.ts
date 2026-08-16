import { createManifest } from '~/lib/metadata';

import config from '~/app/diegocosta.com.br/config';

export const GET = () =>
  createManifest({
    name: config.title,
    description: config.description,
  });
