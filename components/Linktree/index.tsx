import Link from 'next/link';
import * as Fa6 from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

import * as RecentActivity from '~/components/RecentActivity';

import styles from './styles.module.css';

export interface LinktreeProps extends React.PropsWithChildren {
  background?: string;
  social: Array<{
    title: string;
    icon: keyof typeof Fa6;
    href: string;
    description?: string;
  }>;
  pages: Array<{
    title: string;
    icon?: keyof typeof Fa6;
    href: string;
    description?: string;
    recentActivity?: keyof typeof RecentActivity;
  }>;
}

export default function Linktree(props: LinktreeProps) {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${props.background})` }}>
      <div className={styles.content}>
        {props.children}
        <div className={styles.socialList}>
          {props.social.map((social) => {
            const Icon = Fa6[social.icon];

            return (
              <a
                key={social.href}
                href={social.href}
                title={`${social.title}${social.description && `- ${social.description}`}`}
                target="_blank"
                rel="noreferrer"
                className={styles.socialItem}
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className={styles.pagesList}>
          {props.pages.map((page) => {
            const RecentActivityWidget = page.recentActivity && RecentActivity[page.recentActivity];
            const Icon = page.icon && Fa6[page.icon];
            const isExternalLink = page.href.startsWith('http');

            return (
              <Link
                key={page.href}
                href={page.href}
                className={styles.pagesItemLink}
                target={isExternalLink ? '_blank' : '_self'}
              >
                <div className={styles.pagesItemDetails}>
                  <p className={styles.pagesItemTitle}>
                    {Icon && <Icon className={styles.pageItemIcon} />} {page.title}
                  </p>
                  {isExternalLink && <FiExternalLink className={styles.pagesItemExternalLinkIcon} />}
                </div>
                {page.description && <p className={styles.pagesItemDescription}>{page.description}</p>}

                {RecentActivityWidget && (
                  <div className={styles.pagesItemRecentActivity}>
                    <RecentActivityWidget />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
