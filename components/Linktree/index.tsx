import Link from 'next/link';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import * as RecentActivity from '~/components/RecentActivity';

import styles from './styles.module.css';

export interface LinktreeProps extends React.PropsWithChildren {
  background?: string;
  icons: Array<{
    title: string;
    icon: keyof typeof Fa6;
    href: string;
    description?: string;
  }>;
  cards: Array<{
    title: string;
    icon?: keyof typeof Fa6;
    href: string;
    description?: string;
    recentActivity?: {
      widget: keyof typeof RecentActivity;
      variables?: {
        username?: string;
        authorization?: string;
      };
    };
  }>;
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
              <section key={card.href} aria-labelledby={`${card.title}-title`}>
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
                      <RecentActivityWidget {...card.recentActivity?.variables} />
                    </div>
                  )}
                </Link>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
