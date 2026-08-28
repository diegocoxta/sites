import Link from 'next/link';
import Image from 'next/image';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import { getLocatedString, type SupportedLanguageKey } from '~/lib/lang';
import type { CardLinkType, IconLinkType } from '~/lib/config';

import * as RecentActivity from '~/components/RecentActivity';

import styles from './styles.module.css';

export interface LinktreeProps extends React.PropsWithChildren {
  background?: string;
  lang?: SupportedLanguageKey;
  icons: Array<
    IconLinkType & {
      icon: keyof typeof Fa6;
    }
  >;
  cards: Array<
    CardLinkType & {
      icon?: keyof typeof Fa6;
      recentActivity?: {
        widget: keyof typeof RecentActivity;
      };
    }
  >;
}

export default function Linktree(props: LinktreeProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${props.background})` }}>
      <main className={styles.content}>
        {props.children}
        <nav>
          <ul className={styles.iconsList}>
            {props.icons.map((icon) => {
              const Icon = Fa6[icon.icon];

              return (
                <li key={icon.href}>
                  <a
                    href={icon.href}
                    title={getLocatedString(icon.title, props.lang)}
                    aria-label={getLocatedString(icon.title, props.lang)}
                    target="_blank"
                    rel="me noreferrer noopener"
                    className={styles.iconsItem}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.cardsList}>
          {props.cards.map((card) => {
            const RecentActivityWidget = card.recentActivity && RecentActivity[card.recentActivity.widget];
            const Icon = card.icon && Fa6[card.icon];
            const isExternalLink = card.href.startsWith('http');

            return (
              <section className={styles.cardsItem} key={card.href} aria-labelledby={`${card.title}-title`}>
                <Link
                  href={card.href}
                  className={styles.cardsItemLink}
                  target={isExternalLink ? '_blank' : '_self'}
                  rel={isExternalLink ? 'me noopener' : undefined}
                >
                  <header className={styles.cardsItemDetails}>
                    <h2 className={styles.cardsItemTitle} id={`${card.title}-title`}>
                      {Icon && <Icon className={styles.pageItemIcon} aria-hidden />}{' '}
                      {getLocatedString(card.title, props.lang)}
                    </h2>
                    {isExternalLink && <FiExternalLink className={styles.cardsItemExternalLinkIcon} aria-hidden />}
                  </header>
                  {card.description && (
                    <p className={styles.cardsItemDescription}>{getLocatedString(card.description, props.lang)}</p>
                  )}

                  {RecentActivityWidget && card.recentActivity?.config && (
                    <div className={styles.cardsItemRecentActivity}>
                      <RecentActivityWidget config={card.recentActivity?.config} lang={props.lang} />
                    </div>
                  )}
                </Link>
              </section>
            );
          })}
        </div>
      </main>
      <div className={styles.qrCode}>
        <Image src="/qr-code.png" alt="QR Code" width={150} height={150} className={styles.qrCodeImage} unoptimized />
        <p className={styles.qrCodeDescription}>Scan to view on your phone</p>
      </div>
    </div>
  );
}
