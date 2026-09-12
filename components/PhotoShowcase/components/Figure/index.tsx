'use client';

import { useState } from 'react';

import { useTranslator } from '~/components/TranslationProvider';
import Skeleton from '~/components/Skeleton';

import type { Photo, PhotoDetails } from '../../types';

import UnsplashImage from '../UnsplashImage';
import Exif from '../Exif';

import styles from './styles.module.css';

interface FigureProps {
  photo: Photo;
  index: number;
  total: number;
  inverted: boolean;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
  topRight?: React.ReactNode;
}

export default function Figure({ photo, index, total, inverted, getPhotoDetails, topRight }: FigureProps) {
  const t = useTranslator();
  const [imageLoaded, setImageLoaded] = useState(false);

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
      </div>
      <figcaption className={`${styles.caption} ${inverted ? styles.captionInverted : ''}`}>
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
      <Exif photoId={photo.id} getPhotoDetails={getPhotoDetails} inverted={inverted} />
    </figure>
  );
}
