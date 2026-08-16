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
          <ul className={styles.socialList}>
            {props.social.map((social) => {
              const Icon = Fa6[social.icon];

              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    title={`Find me on ${social.title}`}
                    aria-label={social.title}
                    target="_blank"
                    rel="me noreferrer noopener"
                    className={styles.socialItem}
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.pagesList} aria-label="Outras redes sociais">
          {props.pages.map((page) => {
            const RecentActivityWidget = page.recentActivity && RecentActivity[page.recentActivity.widget];
            const Icon = page.icon && Fa6[page.icon];
            const isExternalLink = page.href.startsWith('http');

            return (
              <section key={page.href} aria-labelledby={`${page.title}-title`}>
                <Link
                  href={page.href}
                  className={styles.pagesItemLink}
                  target={isExternalLink ? '_blank' : '_self'}
                  rel={isExternalLink ? 'me noreferrer noopener' : undefined}
                >
                  <header className={styles.pagesItemDetails}>
                    <h2 className={styles.pagesItemTitle} id={`${page.title}-title`}>
                      {Icon && <Icon className={styles.pageItemIcon} aria-hidden />} {page.title}
                    </h2>
                    {isExternalLink && <FiExternalLink className={styles.pagesItemExternalLinkIcon} aria-hidden />}
                  </header>
                  {page.description && <p className={styles.pagesItemDescription}>{page.description}</p>}

                  {RecentActivityWidget && (
                    <div className={styles.pagesItemRecentActivity}>
                      <RecentActivityWidget {...page.recentActivity?.variables} />
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
