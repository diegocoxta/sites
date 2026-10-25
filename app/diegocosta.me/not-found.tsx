import { getTranslations } from '~/lib/i18n/messages';

import NotFound from '~/components/shared/NotFound';

import config from '~/app/diegocosta.me/config';

export default function NotFoundPage() {
  return <NotFound t={getTranslations(config)} domain={config.domain} />;
}
