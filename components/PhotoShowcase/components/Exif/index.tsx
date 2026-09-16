'use client';

import { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

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
    <div className={styles.panel} aria-hidden>
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
  size: { width: number; height: number };
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  inverted: boolean;
}

type Status = 'idle' | 'loading' | 'loaded';

export default function Exif({ photoId, size, getPhotoDetails, inverted }: ExifProps) {
  const t = useTranslator();
  const [details, setDetails] = useState<PhotoDetails | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleViewMetadata = () => {
    setStatus('loading');

    getPhotoDetails(photoId).then((result) => {
      setDetails(result);
      setStatus('loaded');
    });
  };

  if (status === 'loading') {
    return <ExifSkeleton inverted={inverted} />;
  }

  if (status === 'idle') {
    return (
      <button type="button" className={styles.viewMetadata} onClick={handleViewMetadata}>
        <FaCircleInfo /> {t('client.components.photoshowcase.exif.viewmetadata')}
      </button>
    );
  }

  return (
    <div className={`${styles.panel} ${inverted ? styles.panelInverted : ''}`}>
      {details?.description && (
        <p className={`${styles.description} ${inverted ? styles.descriptionInverted : ''}`}>{details.description}</p>
      )}
      <dl className={`${styles.grid} ${inverted ? styles.gridInverted : ''}`}>
        <div>
          <dt>{t('client.components.photoshowcase.exif.resolution')}</dt>
          <dd>
            {size.width} × {size.height}
          </dd>
        </div>
        {details?.exif?.camera && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.camera')}</dt>
            <dd>{details.exif.camera}</dd>
          </div>
        )}
        {details?.exif?.focalLength && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.focallength')}</dt>
            <dd>{formatFocalLength(details.exif.focalLength)}</dd>
          </div>
        )}
        {details?.exif?.aperture && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.aperture')}</dt>
            <dd>f/{details.exif.aperture}</dd>
          </div>
        )}
        {details?.exif?.shutterSpeed && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.shutter')}</dt>
            <dd>{details.exif.shutterSpeed}s</dd>
          </div>
        )}
        {details?.exif?.iso != null && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.iso')}</dt>
            <dd>{details.exif.iso}</dd>
          </div>
        )}
        {details?.location?.name && (
          <div>
            <dt>{t('client.components.photoshowcase.exif.location')}</dt>
            <dd>{details.location.name}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
