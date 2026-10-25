import { getTranslations } from '~/lib/i18n/messages';
import { manifestResponse } from '~/lib/manifest';

import config from '~/app/diegocosta.com.br/config';

export const revalidate = false;

export const GET = () =>
  manifestResponse({
    config,
    t: getTranslations(config),
    name: config.title,
    shortName: config.title,
    backgroundColor: '#fdfdfd',
  });
