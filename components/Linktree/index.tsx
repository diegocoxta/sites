import Link from 'next/link';
import * as Fa6 from 'react-icons/fa6';

import * as RecentActivity from '~/components/RecentActivity';

import styles from './styles.module.css';

export interface LinktreeProps extends React.PropsWithChildren {
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
    <div className={styles.container}>
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

          return (
            <Link
              key={page.href}
              href={page.href}
              className={styles.pagesLink}
              target={page.href.startsWith('http') ? '_blank' : '_self'}
            >
              <p className={styles.pagesTitle}>
                {Icon && <Icon className={styles.pageIcon} />} {page.title}
              </p>
              {page.description && <p className={styles.pagesDescription}>{page.description}</p>}
              {RecentActivityWidget && <RecentActivityWidget />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
