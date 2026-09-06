import Link from 'next/link';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import type { ComponentWithTranslator } from '~/lib/i18n';
import type { CardLinkType } from '~/lib/config';

import * as RecentActivity from '../RecentActivity';
import WidgetBoundary from '../WidgetBoundary';

import styles from './styles.module.css';

export type CardLinksProps = ComponentWithTranslator<{
  cards: CardLinkType[];
}>;

const faIcon = (name?: string) => (name ? Fa6[name as keyof typeof Fa6] : undefined);

export default function CardLinks({ t, cards }: CardLinksProps) {
  return (
    <div className={styles.list}>
      {cards.map((card) => {
        const RecentActivityWidget = card.recentActivity
          ? RecentActivity[card.recentActivity.widget as keyof typeof RecentActivity]
          : undefined;
        const Icon = faIcon(card.icon);
        const isExternalLink = card.href.startsWith('http');

        return (
          <section
            className={`${styles.item} ${card.highlight ? styles.highlight : ''}`}
            key={card.href}
            aria-labelledby={`${card.href}-title`}
          >
            <header className={styles.details}>
              <h2 className={styles.title} id={`${card.href}-title`}>
                {Icon && <Icon className={styles.icon} aria-hidden />}
                <Link
                  href={card.href}
                  className={styles.link}
                  target={isExternalLink ? '_blank' : undefined}
                  rel={isExternalLink ? 'me noopener' : undefined}
                >
                  {t(card.title)}
                </Link>
              </h2>
              <FiExternalLink className={styles.externalLinkIcon} aria-hidden />
            </header>

            {card.description && <p className={styles.description}>{t(card.description)}</p>}

            {RecentActivityWidget && card.recentActivity?.config && (
              <div>
                <WidgetBoundary>
                  <RecentActivityWidget config={card.recentActivity.config} t={t} />
                </WidgetBoundary>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
