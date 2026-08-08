import { FaInstagram, FaTiktok, FaYoutube, FaUnsplash, FaMastodon } from 'react-icons/fa';

import styles from './styles.module.css';
import { PropsWithChildren } from 'react';

export interface SocialButtonProps {
  title: string;
  icon: 'instagram' | 'tiktok' | 'youtube' | 'unsplash' | 'mastodon';
  href: string;
}

export function SocialButtonList(props: React.PropsWithChildren) {
  return <div className={styles.list}>{props.children}</div>;
}

export default function SocialButton(props: SocialButtonProps) {
  const icons: Record<SocialButtonProps['icon'], React.ElementType> = {
    instagram: FaInstagram,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    unsplash: FaUnsplash,
    mastodon: FaMastodon,
  };

  const Icon = icons[props.icon];

  return (
    <a href={props.href} title={props.title} target="_blank" rel="noreferrer" className={styles.button}>
      <Icon />
    </a>
  );
}
