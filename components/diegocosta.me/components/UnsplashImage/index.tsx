import Image, { type ImageLoaderProps } from 'next/image';
import type { ComponentProps } from 'react';

function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);

  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format,compress');
  url.searchParams.set('fit', 'max');

  return url.toString();
}

export default function UnsplashImage({ alt, ...props }: ComponentProps<typeof Image>) {
  return <Image alt={alt} {...props} loader={imageLoader} />;
}
