/**
 * The one place that translates the photo data layer (Unsplash) into the generic shapes
 * the PhotographyPortfolio components speak. Swap the source (a CMS, a filesystem, …) by
 * rewriting these mappers — the components never change.
 */
import type {
  Collection,
  Photo as UnsplashPhoto,
  PhotoDetails as SourcePhotoDetails,
  PhotoPage as SourcePhotoPage,
} from '~/lib/unsplash';

import type {
  CollectionRef,
  CollectionSummary,
  Gallery,
  Photo,
  LightboxPhoto,
  PhotoDetails,
} from '~/components/PhotographyPortfolio/types';

/** The photo host these mappers read from — the only spot that names it. */
const SOURCE_NAME = 'Unsplash';

export function toGalleryPhoto(photo: UnsplashPhoto): Photo {
  return {
    id: photo.id,
    src: photo.urls.regular,
    alt: photo.alt_description ?? '',
    width: photo.width,
    height: photo.height,
    placeholderColor: photo.color,
  };
}

export function toGalleryPage(page: SourcePhotoPage): Gallery {
  return { photos: page.photos.map(toGalleryPhoto), hasMore: page.hasMore, ok: page.ok };
}

export function toLightboxPhoto(photo: UnsplashPhoto): LightboxPhoto {
  return {
    ...toGalleryPhoto(photo),
    href: photo.links.html,
    source: SOURCE_NAME,
  };
}

export function toCollectionSummary(collection: Collection): CollectionSummary {
  return {
    id: collection.id,
    title: collection.title,
    photoCount: collection.totalPhotos,
    coverSrc: collection.coverUrl,
  };
}

export function toCollectionRef(collection: Collection): CollectionRef {
  return { id: collection.id, title: collection.title };
}

export function toPhotoDetails(details: SourcePhotoDetails): PhotoDetails {
  return {
    description: details.description,
    exif: details.exif && {
      camera: details.exif.camera,
      aperture: details.exif.aperture,
      focalLength: details.exif.focalLength,
      iso: details.exif.iso,
      shutterSpeed: details.exif.exposureTime,
    },
    location: details.location && {
      name: details.location.name,
      city: details.location.city,
      country: details.location.country,
      latitude: details.location.latitude,
      longitude: details.location.longitude,
    },
  };
}
