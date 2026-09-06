import Image from 'next/image';
import * as Fa from 'react-icons/fa6';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import Logo from '~/components/Logo';

import styles from './styles.module.css';

type SocialLink = { href: string; icon: string; title: string };

type ProfileProps = ComponentWithTranslator<{
  name: string;
  avatar: string;
  socialLinks?: SocialLink[];
}>;

/** The "who's behind this" tile — portrait, name, bio and social links. First cell of every gallery page. */
export default function Profile({ t, name, avatar, socialLinks }: ProfileProps): React.ReactElement {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={avatar}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        priority
        unoptimized
      />
      <div className={styles.overlay}>
        <Logo name={name} size={56} />
        <p className={styles.text}>{t('page.home.bio')}</p>
        {socialLinks && socialLinks.length > 0 && (
          <ul className={styles.social}>
            {socialLinks.map((link) => {
              const Icon = Fa[link.icon as keyof typeof Fa];
              return (
                <li key={link.href}>
                  <a target="_blank" href={link.href} rel="me noopener" title={t(link.title)}>
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
