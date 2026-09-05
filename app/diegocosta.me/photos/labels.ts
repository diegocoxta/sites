import type { Translator } from '~/lib/i18n';

/** The PhotoLightbox labels shared by every photo/collection-photo page (the "close" label varies per call site and is merged in separately). */
export function lightboxLabels(t: Translator) {
  return {
    previous: t('page.photos.previous'),
    next: t('page.photos.next'),
    viewOnUnsplash: t('page.photos.viewOnUnsplash'),
    like: t('page.photos.like'),
    likes: t('page.photos.likes'),
    alsoIn: t('page.photos.alsoIn'),
    exif: {
      camera: t('page.photos.exif.camera'),
      focalLength: t('page.photos.exif.focalLength'),
      aperture: t('page.photos.exif.aperture'),
      shutter: t('page.photos.exif.shutter'),
      iso: t('page.photos.exif.iso'),
      location: t('page.photos.exif.location'),
    },
  };
}
