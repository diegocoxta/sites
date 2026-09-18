'use client';

import { useState } from 'react';

import type { PhotoDetails } from '../types';

export type ExifStatus = 'idle' | 'loading' | 'loaded';

export function useExifDetails(photoId: string, getPhotoDetails: (id: string) => Promise<PhotoDetails | null>) {
  const [details, setDetails] = useState<PhotoDetails | null>(null);
  const [status, setStatus] = useState<ExifStatus>('idle');

  const load = () => {
    setStatus('loading');

    getPhotoDetails(photoId).then((result) => {
      setDetails(result);
      setStatus('loaded');
    });
  };

  return { status, details, load };
}
