import Link from 'next/link';
import Image from 'next/image';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import { CardLinkType, IconLinkType } from '~/lib/config';

import * as RecentActivity from '~/components/RecentActivity';

import styles from './styles.module.css';

export interface LinktreeProps extends React.PropsWithChildren {
  background?: string;
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
        <nav aria-label="Principais Redes sociais">
          <ul className={styles.iconsList}>
            {props.icons.map((icon) => {
              const Icon = Fa6[icon.icon];

              return (
                <li key={icon.href}>
                  <a
                    href={icon.href}
                    title={`Find me on ${icon.title}`}
                    aria-label={icon.title}
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

        <div className={styles.cardsList} aria-label="Outras redes sociais">
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
                      {Icon && <Icon className={styles.pageItemIcon} aria-hidden />} {card.title}
                    </h2>
                    {isExternalLink && <FiExternalLink className={styles.cardsItemExternalLinkIcon} aria-hidden />}
                  </header>
                  {card.description && <p className={styles.cardsItemDescription}>{card.description}</p>}

                  {RecentActivityWidget && (
                    <div className={styles.cardsItemRecentActivity}>
                      <RecentActivityWidget {...card.recentActivity?.props} />
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
