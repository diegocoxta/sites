'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Collection, PhotoDetails } from '~/lib/unsplash';

import Skeleton from '~/components/Skeleton';

import ApertureSpinner from './ApertureSpinner';
import type { LightboxPhoto, PhotoLightboxLabels } from './types';
import styles from './styles.module.css';

/** "141.0" -> "141mm", "24.5" -> "24.5mm" */
function formatFocalLength(value: string): string {
  return `${value.replace(/\.0$/, '')}mm`;
}

// Rough field-count/width guess so the skeleton reserves about the space the real grid
// will need — it doesn't have to be exact, just close enough that settling in isn't a jump.
const SKELETON_FIELD_WIDTHS = [64, 56, 46, 58, 34, 84];

function DetailsSkeleton({ inverted }: { inverted: boolean }): React.ReactElement {
  return (
    <div className={styles.details} aria-hidden>
      <Skeleton colorInverted={inverted} height={13} width="65%" className={styles.skeletonDescription} />
      <dl className={styles.detailsGrid}>
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

interface PhotoFigureProps {
  photo: LightboxPhoto;
  index: number;
  total: number;
  /** For a permanently-dark background (the modal variant), so the skeleton stays visible. */
  inverted: boolean;
  photoCollections: Array<Pick<Collection, 'id' | 'title'>>;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  labels: PhotoLightboxLabels;
}

// Keyed by `photo.id` at the call site in index.tsx, so switching photos remounts this
// and both `imageLoaded` and `details` naturally start fresh instead of needing a
// manual reset inside an effect.
export default function PhotoFigure({
  photo,
  index,
  total,
  inverted,
  photoCollections,
  getPhotoDetails,
  labels,
}: PhotoFigureProps): React.ReactElement {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [details, setDetails] = useState<PhotoDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPhotoDetails(photo.id)
      .then((result) => {
        if (!cancelled) {
          setDetails(result);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setDetailsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [photo.id, getPhotoDetails]);

  return (
    <figure className={styles.figure}>
      <div className={styles.imageWrap} style={{ backgroundColor: photo.color ?? undefined }}>
        {!imageLoaded && <ApertureSpinner />}
        <Image
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          src={photo.urls.regular}
          alt={photo.alt_description ?? ''}
          width={photo.width}
          height={photo.height}
          sizes="95vw"
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <figcaption className={styles.caption}>
        <span>
          {index + 1} / {total}
          {photo.likes > 0 && ` · ${photo.likes} ${photo.likes === 1 ? labels.like : labels.likes}`}
        </span>
        <a href={photo.links.html} target="_blank" rel="noopener noreferrer">
          {labels.viewOnUnsplash}
        </a>
      </figcaption>
      {photoCollections.length > 0 && (
        <p className={styles.collections}>
          {labels.alsoIn}{' '}
          {photoCollections.map((collection, i) => (
            <span key={collection.id}>
              <Link href={`/collections/${collection.id}`}>{collection.title}</Link>
              {i < photoCollections.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}
      {detailsLoading ? (
        <DetailsSkeleton inverted={inverted} />
      ) : (
        details && (
          <div className={styles.details}>
            {details.description && <p className={styles.detailsDescription}>{details.description}</p>}
            <dl className={styles.detailsGrid}>
              {details.exif?.camera && (
                <div>
                  <dt>{labels.exif.camera}</dt>
                  <dd>{details.exif.camera}</dd>
                </div>
              )}
              {details.exif?.focalLength && (
                <div>
                  <dt>{labels.exif.focalLength}</dt>
                  <dd>{formatFocalLength(details.exif.focalLength)}</dd>
                </div>
              )}
              {details.exif?.aperture && (
                <div>
                  <dt>{labels.exif.aperture}</dt>
                  <dd>f/{details.exif.aperture}</dd>
                </div>
              )}
              {details.exif?.exposureTime && (
                <div>
                  <dt>{labels.exif.shutter}</dt>
                  <dd>{details.exif.exposureTime}s</dd>
                </div>
              )}
              {details.exif?.iso != null && (
                <div>
                  <dt>{labels.exif.iso}</dt>
                  <dd>{details.exif.iso}</dd>
                </div>
              )}
              {details.location?.name && (
                <div>
                  <dt>{labels.exif.location}</dt>
                  <dd>{details.location.name}</dd>
                </div>
              )}
            </dl>
          </div>
        )
      )}
    </figure>
  );
}
