'use client';

import Link from 'next/link';

import { useTranslator } from '~/components/TranslationProvider';

import type { CollectionRef, LightboxPhoto, PhotoDetails } from '../../types';
import Figure from '../Figure';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useLightboxNavigation } from '../../hooks/useLightboxNavigation';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import styles from './styles.module.css';

interface LightboxProps {
  photo: LightboxPhoto;
  prevId: string | null;
  nextId: string | null;
  index: number;
  total: number;
  variant: 'modal' | 'page';
  hrefBase: string;
  closeHref: string;
  /** Collections this photo appears in, for the "also in" cross-links. */
  photoCollections: CollectionRef[];
  /**
   * Fetched client-side, after this page has already rendered — exif/location live on a
   * per-photo endpoint with no bulk variant, so it's never part of the static build.
   * Resolving to `null` (missing, rate-limited, whatever) just means the panel stays hidden.
   */
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
}

export default function Lightbox({
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
}: LightboxProps): React.ReactElement {
  const t = useTranslator();
  const { hrefFor, goTo, close } = useLightboxNavigation({ variant, hrefBase, closeHref, prevId, nextId });
  const { onTouchStart, onTouchEnd } = useSwipeNavigation(goTo, prevId, nextId);

  useBodyScrollLock(variant === 'modal');

  const prevLabel = t('client.components.lightbox.previous');
  const nextLabel = t('client.components.lightbox.next');
  const backLabel = t('client.components.lightbox.backToGallery');

  const figure = (
    <Figure
      key={photo.id}
      photo={photo}
      index={index}
      total={total}
      inverted={variant === 'modal'}
      photoCollections={photoCollections}
      getPhotoDetails={getPhotoDetails}
    />
  );

  const prevControl = prevId ? (
    <Link className={styles.nav} href={hrefFor(prevId)} replace scroll={false} aria-label={prevLabel}>
      &lsaquo;
    </Link>
  ) : (
    <span className={`${styles.nav} ${styles.navDisabled}`} aria-hidden>
      &lsaquo;
    </span>
  );

  const nextControl = nextId ? (
    <Link className={styles.nav} href={hrefFor(nextId)} replace scroll={false} aria-label={nextLabel}>
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
          &larr; {backLabel}
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
      <button className={styles.close} type="button" onClick={close} aria-label={backLabel}>
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
