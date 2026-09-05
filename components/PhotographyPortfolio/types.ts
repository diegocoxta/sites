export type Photo = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholderColor: string | null;
};

export type Gallery = {
  photos: Photo[];
  hasMore: boolean;
  ok: boolean;
};

export type LightboxPhoto = Photo & {
  href: string;
  source: string;
};

export type CollectionSummary = {
  id: string;
  title: string;
  photoCount: number;
  coverSrc: string | null;
};

export type CollectionRef = Pick<CollectionSummary, 'id' | 'title'>;

export type PhotoDetails = {
  description: string | null;
  exif: {
    camera: string | null;
    aperture: string | null;
    focalLength: string | null;
    iso: number | null;
    shutterSpeed: string | null;
  } | null;
  location: {
    name: string | null;
    city: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
  } | null;
};
