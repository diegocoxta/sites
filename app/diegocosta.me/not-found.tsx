import PageDescription from '~/components/PageDescription';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.me/config';

export default function NotFoundPage() {
  const t = getTranslations(config);

  return <PageDescription id="centered-page" content={t('page.notFound.message', { domain: config.domain })} />;
}
