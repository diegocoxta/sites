'use client';

import { useTranslator } from '~/components/TranslationProvider';

import NotFound from '~/components/NotFound';

import config from '~/app/diegocoxta.com/config';

export default function LocaleNotFoundPage(): React.ReactElement {
  const t = useTranslator();

  return <NotFound t={t} domain={config.domain} />;
}
