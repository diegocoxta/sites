import Link from 'next/link';
import Image from 'next/image';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import type { ComponentWithTranslator } from '~/lib/i18n';
import type { CardLinkType, IconLinkType } from '~/lib/config';

import Username from './components/Username';
import * as RecentActivity from './components/RecentActivity';
import WidgetBoundary from './components/WidgetBoundary';

import styles from './styles.module.css';

export type LinktreeProps = ComponentWithTranslator<{
  username: string;
  description?: string;
  background?: string;
  icons: IconLinkType[];
  cards: CardLinkType[];
}>;

const faIcon = (name?: string) => (name ? Fa6[name as keyof typeof Fa6] : undefined);

export default function Linktree({ t, username, description, background, icons, cards }: LinktreeProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${background})` }}>
      <main className={styles.content}>
        <header className={styles.header}>
          <Username username={username} size={32} />
          {description && <p className={styles.description}>{t(description)}</p>}
        </header>
        <nav>
          <ul className={styles.iconsList}>
            {icons.map((icon) => {
              const Icon = faIcon(icon.icon);
              const label = t(icon.title);

              return (
                <li key={icon.href}>
                  <a
                    href={icon.href}
                    title={label}
                    aria-label={label}
                    target="_blank"
                    rel="me noopener"
                    className={styles.iconsItem}
                  >
                    {Icon && <Icon />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.cardsList}>
          {cards.map((card) => {
            const RecentActivityWidget = card.recentActivity
              ? RecentActivity[card.recentActivity.widget as keyof typeof RecentActivity]
              : undefined;
            const Icon = faIcon(card.icon);
            const isExternalLink = card.href.startsWith('http');

            return (
              <section
                className={`${styles.cardsItem} ${card.highlight ? styles.highlight : ''}`}
                key={card.href}
                aria-labelledby={`${card.href}-title`}
              >
                <header className={styles.cardsItemDetails}>
                  <h2 className={styles.cardsItemTitle} id={`${card.href}-title`}>
                    {Icon && <Icon className={styles.pageItemIcon} aria-hidden />}
                    <Link
                      href={card.href}
                      className={styles.cardsItemLink}
                      target={isExternalLink ? '_blank' : undefined}
                      rel={isExternalLink ? 'me noopener' : undefined}
                    >
                      {t(card.title)}
                    </Link>
                  </h2>
                  <FiExternalLink className={styles.cardsItemExternalLinkIcon} aria-hidden />
                </header>

                {card.description && <p className={styles.cardsItemDescription}>{t(card.description)}</p>}

                {RecentActivityWidget && card.recentActivity?.config && (
                  <div className={styles.cardsItemRecentActivity}>
                    <WidgetBoundary>
                      <RecentActivityWidget config={card.recentActivity.config} t={t} />
                    </WidgetBoundary>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <div className={styles.qrCode}>
        <Image src="/qr-code.png" alt="QR Code" width={150} height={150} className={styles.qrCodeImage} unoptimized />
        <p className={styles.qrCodeDescription}>{t('components.linktree.qrHint')}</p>
      </div>
    </div>
  );
}
