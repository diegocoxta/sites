import Image from 'next/image';
import Link from 'next/link';
import * as Fa from 'react-icons/fa6';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';
import type { ContentAttributes } from '~/lib/content';

import Logo from '~/components/shared/Logo';

import LanguageSwitcher from '~/components/diegocosta.me/components/LanguageSwitcher';

import styles from './styles.module.css';

type SocialLink = { href: string; icon: string; title: string };

type ProfileProps = ComponentWithTranslator<{
  name: string;
  avatar: string;
  socialLinks?: SocialLink[];
  pages?: Array<Pick<ContentAttributes, 'title' | 'href'>>;
  locales: readonly string[];
  /** Path of the current page below the locale (`''`, `/about-me`, `/p/<id>`), used by the language links. */
  path: string;
}>;

export default function Profile({ t, ...props }: ProfileProps) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={props.avatar}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        priority
        unoptimized
      />
      <div className={styles.overlay}>
        <Logo name={props.name} size={48} />
        <p className={styles.text}>{`${t('config.description')} ${t('components.profile.bio')}`}</p>
        {props.socialLinks && props.socialLinks.length > 0 && (
          <ul className={styles.social}>
            {props.socialLinks.map((link) => {
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
        <div className={styles.footer}>
          {props.pages && props.pages.length > 0 && (
            <ul className={styles.pages}>
              {props.pages.map((page) => (
                <li key={page.href}>
                  <Link href={`/${t.locale}${page.href}`} aria-current={page.href === props.path ? 'page' : undefined}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <LanguageSwitcher t={t} locales={props.locales} path={props.path} />
        </div>
      </div>
    </div>
  );
}
