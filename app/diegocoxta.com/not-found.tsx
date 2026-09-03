import { getTranslations } from '~/lib/i18n/messages';

import NotFound from '~/components/NotFound';

import config from '~/app/diegocoxta.com/config';

export default function NotFoundPage(): React.ReactElement {
  return <NotFound t={getTranslations(config)} domain={config.domain} />;
}
