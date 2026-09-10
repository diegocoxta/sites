'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { useTranslator } from '~/components/TranslationProvider';

import UnsplashImage from '../UnsplashImage';

import type { Photo } from '../../types';

import styles from './styles.module.css';

interface TileProps {
  photo: Photo;
  hrefBase: string;
}

export default function Tile({ photo, hrefBase }: TileProps) {
  const t = useTranslator();
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <Link
      className={styles.tile}
      href={`${hrefBase}/${photo.id}`}
      scroll={false}
      style={{
        aspectRatio: `${photo.width} / ${photo.height}`,
        backgroundColor: photo.placeholderColor ?? undefined,
      }}
    >
      <UnsplashImage
        ref={imageRef}
        className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
        src={photo.src}
        alt={
          [photo.description, photo.alt].filter(Boolean).join(' - ') || t('client.components.photoshowcase.photoalt')
        }
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
}
