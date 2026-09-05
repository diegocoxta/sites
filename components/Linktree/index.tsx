import type { ComponentWithTranslator } from '~/lib/i18n';
import type { CardLinkType, IconLinkType } from '~/lib/config';

import Username from './components/Username';
import IconLinks from './components/IconLinks';
import CardLinks from './components/CardLinks';
import QrCode from './components/QrCode';

import styles from './styles.module.css';

export type LinktreeProps = ComponentWithTranslator<{
  username: string;
  description?: string;
  background?: string;
  icons: IconLinkType[];
  cards: CardLinkType[];
}>;

export default function Linktree({ t, username, description, background, icons, cards }: LinktreeProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <main className={styles.content}>
        <header className={styles.header}>
          <Username username={username} size={32} />
          {description && <p className={styles.description}>{t(description)}</p>}
        </header>
        <IconLinks t={t} icons={icons} />
        <CardLinks t={t} cards={cards} />
      </main>
      <QrCode t={t} />
    </div>
  );
}
