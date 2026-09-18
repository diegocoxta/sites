'use client';

import Skeleton from '~/components/Skeleton';
import { useTranslator } from '~/components/TranslationProvider';

import type { ExifStatus } from '~/components/PhotoShowcase/hooks';
import type { PhotoDetails } from '~/components/PhotoShowcase/types';

import styles from './styles.module.css';

function formatFocalLength(value: string): string {
  return `${value.replace(/\.0$/, '')}mm`;
}

const SKELETON_FIELD_WIDTHS = [64, 56, 46, 58, 34, 84];

function ExifSkeleton() {
  return (
    <div className={styles.panel} aria-hidden>
      <Skeleton height={13} width="65%" className={styles.skeletonDescription} />
      <dl className={styles.grid}>
        {SKELETON_FIELD_WIDTHS.map((width, i) => (
          <div key={i}>
            <Skeleton height={8} width={36} className={styles.skeletonLabel} />
            <Skeleton height={13} width={width} />
          </div>
        ))}
      </dl>
    </div>
  );
}

interface ExifProps {
  status: ExifStatus;
  details: PhotoDetails | null;
  size: { width: number; height: number };
}

export default function Exif({ status, details, size }: ExifProps) {
  const t = useTranslator();

  if (status === 'idle') {
    return null;
  }

  if (status === 'loading') {
    return <ExifSkeleton />;
  }

  return (
    <div className={styles.panel}>
      <dl className={styles.grid}>
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
