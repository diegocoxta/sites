'use client';

import { useTranslator } from '~/components/shared/TranslationProvider';
import NotFound from '~/components/shared/NotFound';

import config from '~/app/diegocosta.me/config';

export default function LocaleNotFoundPage() {
  const t = useTranslator();

  return <NotFound t={t} domain={config.domain} />;
}
