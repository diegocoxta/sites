'use client';

import Link from 'next/link';

import { useTranslator } from '~/components/TranslationProvider';

import type { Photo } from '~/components/PhotoShowcase/types';
import { filmrollPhotos } from '~/components/PhotoShowcase/utils';
import UnsplashImage from '~/components/PhotoShowcase/components/UnsplashImage';

import styles from './styles.module.css';

/** How many photos on each side stay visible on mobile, out of the desktop window. */
const MOBILE_RADIUS = 1;

interface FilmrollProps {
  photos: Photo[];
  currentId: string;
  hrefBase: string;
}

export default function Filmroll({ photos, currentId, hrefBase }: FilmrollProps) {
  const t = useTranslator();
  const currentIndex = photos.findIndex((photo) => photo.id === currentId);

  if (photos.length <= 1 || currentIndex === -1) {
    return null;
  }

  const mobileIds = new Set(filmrollPhotos(photos, currentIndex, MOBILE_RADIUS).map((photo) => photo.id));

  return (
    <div className={styles.filmroll}>
      <h3 className={styles.title}>{t('client.components.photoshowcase.filmroll.label')}</h3>
      <ul className={styles.list}>
        {photos.map((photo) => {
          const isCurrent = photo.id === currentId;
          const alt =
            [photo.description, photo.alt].filter(Boolean).join(' - ') || t('client.components.photoshowcase.photoalt');

          return (
            <li key={photo.id} className={styles.item} data-mobile={mobileIds.has(photo.id)}>
              {isCurrent ? (
                <div className={styles.thumb} aria-current="true">
                  <UnsplashImage className={styles.image} src={photo.thumbnailSrc} alt={alt} fill sizes="120px" />
                </div>
              ) : (
                <Link className={styles.thumb} href={`${hrefBase}/${photo.id}`} scroll={false} aria-label={alt}>
                  <UnsplashImage className={styles.image} src={photo.thumbnailSrc} alt={alt} fill sizes="120px" />
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
