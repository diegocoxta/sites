import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaUnsplash,
  FaMastodon,
  FaGithub,
  FaLinkedin,
  FaBluesky,
  FaThreads,
} from 'react-icons/fa6';

import styles from './styles.module.css';

export interface SocialLinkProps {
  title: string;
  icon: 'instagram' | 'tiktok' | 'youtube' | 'unsplash' | 'mastodon' | 'linkedin' | 'github' | 'threads' | 'bluesky';
  href: string;
}

export function SocialLinkList(props: React.PropsWithChildren) {
  return <div className={styles.list}>{props.children}</div>;
}

export default function SocialLink(props: SocialLinkProps) {
  const icons: Record<SocialLinkProps['icon'], React.ElementType> = {
    instagram: FaInstagram,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    unsplash: FaUnsplash,
    mastodon: FaMastodon,
    github: FaGithub,
    linkedin: FaLinkedin,
    bluesky: FaBluesky,
    threads: FaThreads,
  };

  const Icon = icons[props.icon];

  return (
    <a href={props.href} title={props.title} target="_blank" rel="noreferrer" className={styles.link}>
      <Icon />
    </a>
  );
}
