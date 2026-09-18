'use client';

import { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

import { useTranslator } from '~/components/TranslationProvider';
import Skeleton from '~/components/Skeleton';

import type { Photo, PhotoDetails } from '~/components/PhotoShowcase/types';
import { useExifDetails } from '~/components/PhotoShowcase/hooks';
import UnsplashImage from '~/components/PhotoShowcase/components/UnsplashImage';
import Exif from '~/components/PhotoShowcase/components/Exif';

import styles from './styles.module.css';

interface FigureProps {
  photo: Photo;
  index: number;
  total: number;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  topRight?: React.ReactNode;
}

export default function Figure({ photo, index, total, getPhotoDetails, topRight }: FigureProps) {
  const t = useTranslator();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { status: exifStatus, details: exifDetails, load: loadExif } = useExifDetails(photo.id, getPhotoDetails);

  return (
    <figure className={styles.figure} style={{ '--ratio': photo.width / photo.height } as React.CSSProperties}>
      {topRight}
      <div className={styles.imageWrap} style={{ backgroundColor: photo.placeholderColor ?? undefined }}>
        {!imageLoaded && <Skeleton className={styles.skeleton} borderRadius={0} tinted />}
        <UnsplashImage
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          src={photo.src}
          alt={
            [photo.description, photo.alt].filter(Boolean).join(' - ') || t('client.components.photoshowcase.photoalt')
          }
          fill
          sizes="(min-width: 1024px) 55vw, 95vw"
          priority
          onLoad={() => setImageLoaded(true)}
        />
        {exifStatus === 'idle' && (
          <button
            type="button"
            className={styles.exifButton}
            onClick={loadExif}
            aria-label={t('client.components.photoshowcase.exif.viewmetadata')}
          >
            <FaCircleInfo aria-hidden />
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>
        <span>
          {index + 1} / {total}
        </span>
        {photo.source && (
          <span
            dangerouslySetInnerHTML={{
              __html: t('client.components.photoshowcase.lightbox.credit', {
                author: photo.source.author,
                authorUrl: photo.source.authorUrl,
                source: photo.source.name,
                sourceUrl: photo.source.url,
              }),
            }}
          />
        )}
      </figcaption>
      <p className={styles.description}>{photo.description}</p>
      <Exif status={exifStatus} details={exifDetails} size={{ width: photo.width, height: photo.height }} />
    </figure>
  );
}
