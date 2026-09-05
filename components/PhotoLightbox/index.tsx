'use client';

import Link from 'next/link';

import type { Collection, PhotoDetails } from '~/lib/unsplash';

import PhotoFigure from './PhotoFigure';
import type { LightboxPhoto, PhotoLightboxLabels } from './types';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useLightboxNavigation } from './useLightboxNavigation';
import { useSwipeNavigation } from './useSwipeNavigation';
import styles from './styles.module.css';

export type { LightboxPhoto } from './types';

interface PhotoLightboxProps {
  photo: LightboxPhoto;
  prevId: string | null;
  nextId: string | null;
  index: number;
  total: number;
  variant: 'modal' | 'page';
  hrefBase: string;
  closeHref: string;
  /** Collections this photo appears in, for the "also in" cross-links. */
  photoCollections: Array<Pick<Collection, 'id' | 'title'>>;
  /**
   * Fetched client-side, after this page has already rendered — exif/location live on a
   * per-photo endpoint with no bulk variant, so it's never part of the static build.
   * Resolving to `null` (missing, rate-limited, whatever) just means the panel stays hidden.
   */
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  labels: PhotoLightboxLabels;
}

export default function PhotoLightbox({
  photo,
  prevId,
  nextId,
  index,
  total,
  variant,
  hrefBase,
  closeHref,
  photoCollections,
  getPhotoDetails,
  labels,
}: PhotoLightboxProps): React.ReactElement {
  const { hrefFor, goTo, close } = useLightboxNavigation({ variant, hrefBase, closeHref, prevId, nextId });
  const { onTouchStart, onTouchEnd } = useSwipeNavigation(goTo, prevId, nextId);

  useBodyScrollLock(variant === 'modal');

  const figure = (
    <PhotoFigure
      key={photo.id}
      photo={photo}
      index={index}
      total={total}
      inverted={variant === 'modal'}
      photoCollections={photoCollections}
      getPhotoDetails={getPhotoDetails}
      labels={labels}
    />
  );

  const prevControl = prevId ? (
    <Link className={styles.nav} href={hrefFor(prevId)} replace scroll={false} aria-label={labels.previous}>
      &lsaquo;
    </Link>
  ) : (
    <span className={`${styles.nav} ${styles.navDisabled}`} aria-hidden>
      &lsaquo;
    </span>
  );

  const nextControl = nextId ? (
    <Link className={styles.nav} href={hrefFor(nextId)} replace scroll={false} aria-label={labels.next}>
      &rsaquo;
    </Link>
  ) : (
    <span className={`${styles.nav} ${styles.navDisabled}`} aria-hidden>
      &rsaquo;
    </span>
  );

  if (variant === 'page') {
    return (
      <div className={styles.page}>
        <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {prevControl}
          {figure}
          {nextControl}
        </div>
        <Link className={styles.backLink} href={closeHref}>
          &larr; {labels.close}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <button className={styles.close} type="button" onClick={close} aria-label={labels.close}>
        &times;
      </button>
      <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {prevControl}
        {figure}
        {nextControl}
      </div>
    </div>
  );
}
