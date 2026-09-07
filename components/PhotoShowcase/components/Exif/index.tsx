'use client';

import { useEffect, useState } from 'react';

import Skeleton from '~/components/Skeleton';
import { useTranslator } from '~/components/TranslationProvider';

import type { PhotoDetails } from '../../types';

import styles from './styles.module.css';

function formatFocalLength(value: string): string {
  return `${value.replace(/\.0$/, '')}mm`;
}

const SKELETON_FIELD_WIDTHS = [64, 56, 46, 58, 34, 84];

function ExifSkeleton({ inverted }: { inverted: boolean }) {
  return (
    <div className={`${styles.panel} ${inverted ? styles.panelInverted : ''}`} aria-hidden>
      <Skeleton colorInverted={inverted} height={13} width="65%" className={styles.skeletonDescription} />
      <dl className={styles.grid}>
        {SKELETON_FIELD_WIDTHS.map((width, i) => (
          <div key={i}>
            <Skeleton colorInverted={inverted} height={8} width={36} className={styles.skeletonLabel} />
            <Skeleton colorInverted={inverted} height={13} width={width} />
          </div>
        ))}
      </dl>
    </div>
  );
}

interface ExifProps {
  photoId: string;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  inverted: boolean;
}

export default function Exif({ photoId, getPhotoDetails, inverted }: ExifProps) {
  const t = useTranslator();
  const [details, setDetails] = useState<PhotoDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPhotoDetails(photoId)
      .then((result) => {
        if (!cancelled) {
          setDetails(result);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [photoId, getPhotoDetails]);

  if (loading) {
    return <ExifSkeleton inverted={inverted} />;
  }

  if (!details) {
    return null;
  }

  return (
    <div className={`${styles.panel} ${inverted ? styles.panelInverted : ''}`}>
      {details.description && (
        <p className={`${styles.description} ${inverted ? styles.descriptionInverted : ''}`}>{details.description}</p>
      )}
      <dl className={`${styles.grid} ${inverted ? styles.gridInverted : ''}`}>
        {details.exif?.camera && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.camera')}</dt>
            <dd>{details.exif.camera}</dd>
          </div>
        )}
        {details.exif?.focalLength && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.focallength')}</dt>
            <dd>{formatFocalLength(details.exif.focalLength)}</dd>
          </div>
        )}
        {details.exif?.aperture && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.aperture')}</dt>
            <dd>f/{details.exif.aperture}</dd>
          </div>
        )}
        {details.exif?.shutterSpeed && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.shutter')}</dt>
            <dd>{details.exif.shutterSpeed}s</dd>
          </div>
        )}
        {details.exif?.iso != null && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.iso')}</dt>
            <dd>{details.exif.iso}</dd>
          </div>
        )}
        {details.location?.name && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.location')}</dt>
            <dd>{details.location.name}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
