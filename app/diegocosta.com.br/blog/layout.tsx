import { getTranslations } from '~/lib/i18n/messages';

import FlashMessage from '~/components/Blog/components/FlashMessage';

import config from '~/app/diegocosta.com.br/config';

export default function BlogLayout(props: React.PropsWithChildren) {
  const t = getTranslations(config);

  return (
    <>
      <FlashMessage>{t('components.blog.flashmessage.message')}</FlashMessage>
      {props.children}
    </>
  );
}
