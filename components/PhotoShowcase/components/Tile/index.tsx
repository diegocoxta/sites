'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { Photo } from '../../types';

import styles from './styles.module.css';

interface TileProps {
  photo: Photo;
  hrefBase: string;
}

export default function Tile({ photo, hrefBase }: TileProps) {
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
      style={{ backgroundColor: photo.placeholderColor ?? undefined }}
    >
      <Image
        ref={imageRef}
        className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
}
