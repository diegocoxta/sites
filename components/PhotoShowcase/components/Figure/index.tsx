'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslator } from '~/components/TranslationProvider';

import type { Photo, PhotoDetails } from '../../types';
import ApertureSpinner from '../ApertureSpinner';
import Exif from '../Exif';

import styles from './styles.module.css';

interface FigureProps {
  photo: Photo;
  index: number;
  total: number;
  inverted: boolean;
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
}

export default function Figure({ photo, index, total, inverted, getPhotoDetails }: FigureProps) {
  const t = useTranslator();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <figure className={styles.figure}>
      <div
        className={styles.imageWrap}
        style={{
          aspectRatio: `${photo.width} / ${photo.height}`,
          backgroundColor: photo.placeholderColor ?? undefined,
        }}
      >
        {!imageLoaded && <ApertureSpinner />}
        <Image
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          src={photo.src}
          alt={photo.alt || t('client.components.photoshowcase.photoalt')}
          width={photo.width}
          height={photo.height}
          sizes="95vw"
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
