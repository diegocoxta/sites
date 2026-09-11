'use client';

import { useTranslator } from '~/components/TranslationProvider';

import type { Photo, PhotoDetails } from '../../types';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useLightboxNavigation } from '../../hooks/useLightboxNavigation';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import Figure from '../Figure';
import LightboxActionButton from './ActionButton';

import styles from './styles.module.css';

interface LightboxProps {
  photo: Photo;
  prevId: string | null;
  nextId: string | null;
  index: number;
  total: number;
  variant: 'modal' | 'page';
  hrefBase: string;
  closeHref: string;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
}

export default function Lightbox(props: LightboxProps) {
  const { photo, prevId, nextId, index, total, variant, hrefBase, closeHref, getPhotoDetails } = props;
  const t = useTranslator();
  const { hrefFor, goTo, close } = useLightboxNavigation({ variant, hrefBase, closeHref, prevId, nextId });
  const { onTouchStart, onTouchEnd } = useSwipeNavigation(goTo, prevId, nextId);

  useBodyScrollLock(variant === 'modal');

  const prevLabel = t('client.components.photoshowcase.lightbox.previous');
  const nextLabel = t('client.components.photoshowcase.lightbox.next');
  const backLabel = t('client.components.photoshowcase.lightbox.backtogallery');

  const closeButton = variant === 'modal' && (
    <LightboxActionButton className={styles.close} onClick={close} ariaLabel={backLabel}>
      &times;
    </LightboxActionButton>
  );

  const figure = (
    <Figure
      key={photo.id}
      photo={photo}
      index={index}
      total={total}
      inverted={variant === 'modal'}
      getPhotoDetails={getPhotoDetails}
      topRight={closeButton}
    />
  );

  const prevControl = (
    <LightboxActionButton
      className={styles.nav}
      href={prevId ? hrefFor(prevId) : undefined}
      disabled={!prevId}
      ariaLabel={prevLabel}
    >
      &lsaquo;
    </LightboxActionButton>
  );

  const nextControl = (
    <LightboxActionButton
      className={styles.nav}
      href={nextId ? hrefFor(nextId) : undefined}
      disabled={!nextId}
      ariaLabel={nextLabel}
    >
      &rsaquo;
    </LightboxActionButton>
  );

  if (variant === 'page') {
    return (
      <div className={styles.page}>
        <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {prevControl}
          {figure}
          {nextControl}
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        const target = event.target as HTMLElement;

        if (target === event.currentTarget || target.classList.contains(styles.stage)) {
          close();
        }
      }}
    >
      <div className={styles.stage} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {prevControl}
        {figure}
        {nextControl}
      </div>
    </div>
  );
}
