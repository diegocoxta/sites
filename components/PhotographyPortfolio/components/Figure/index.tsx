'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useTranslator } from '~/components/TranslationProvider';

import type { CollectionRef, LightboxPhoto, PhotoDetails } from '../../types';
import ApertureSpinner from '../ApertureSpinner';
import Exif from '../Exif';
import styles from './styles.module.css';

interface FigureProps {
  photo: LightboxPhoto;
  index: number;
  total: number;
  /** Modal variant sits on a permanently-dark background — flips caption text to light. */
  inverted: boolean;
  photoCollections: CollectionRef[];
  getPhotoDetails: (id: string) => Promise<PhotoDetails | null>;
}

// Keyed by `photo.id` at the call site in Lightbox, so switching photos remounts this
// (and its children), and `imageLoaded` / the exif panel start fresh.
export default function Figure({
  photo,
  index,
  total,
  inverted,
  photoCollections,
  getPhotoDetails,
}: FigureProps): React.ReactElement {
  const t = useTranslator();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.imageWrap} style={{ backgroundColor: photo.placeholderColor ?? undefined }}>
        {!imageLoaded && <ApertureSpinner />}
        <Image
          className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
          src={photo.src}
          alt={photo.alt}
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
          <a href={photo.href} target="_blank" rel="noopener noreferrer">
            {t('client.components.lightbox.source', { source: photo.source })}
          </a>
        )}
      </figcaption>
      {photoCollections.length > 0 && (
        <p className={`${styles.collections} ${inverted ? styles.collectionsInverted : ''}`}>
          {t('client.components.lightbox.alsoIn')}{' '}
          {photoCollections.map((collection, i) => (
            <span key={collection.id}>
              <Link href={`/collections/${collection.id}`}>{collection.title}</Link>
              {i < photoCollections.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}
      <Exif photoId={photo.id} getPhotoDetails={getPhotoDetails} inverted={inverted} />
    </figure>
  );
}
