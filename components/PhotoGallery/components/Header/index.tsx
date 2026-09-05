import Link from 'next/link';
import Image from 'next/image';
import * as Fa from 'react-icons/fa6';

import { IconLinkType } from '~/lib/config';

import Branding from '~/components/Branding';

import styles from './styles.module.css';

interface PhotoGalleryHeaderProps {
  profile: {
    name: string;
    bio: string;
    portrait: string;
    socialLinks?: IconLinkType[];
  };
  collections?: {
    title: string;
    viewAllLabel: string;
    list: Array<{ id: string; title: string; totalPhotos: number }>;
  };
}

export default function PhotoGalleryHeader(props: PhotoGalleryHeaderProps) {
  return (
    <>
      <div className={styles.bioCard}>
        <Image
          className={styles.bioImage}
          src={props.profile.portrait}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          priority
          unoptimized
        />
        <div className={styles.bioOverlay}>
          <Branding name={props.profile.name} size={56} />
          <p className={styles.bioText}>{props.profile.bio}</p>

          <ul className={styles.socialLinks}>
            {props.profile.socialLinks?.map((link) => {
              const Icon = Fa[link.icon as keyof typeof Fa];
              return (
                <li key={link.href}>
                  <a target="_blank" href={link.href} rel="me noopener">
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {props.collections && (
        <div className={styles.collectionsCard}>
          <div className={styles.collectionsKicker}>{props.collections?.title}</div>
          <ul className={styles.collectionsList}>
            {props.collections.list.slice(0, 5).map((collection, index) => (
              <li key={collection.id}>
                <Link className={styles.collectionsItem} href={`/collections/${collection.id}`}>
                  <span className={styles.collectionsIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.collectionsName}>{collection.title}</span>
                  <span className={styles.collectionsCount}>{collection.totalPhotos}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link className={styles.collectionsAll} href="/collections">
            {props.collections?.viewAllLabel}
          </Link>
        </div>
      )}
    </>
  );
}
