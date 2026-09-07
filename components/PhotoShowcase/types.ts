export type Photo = {
  id: string;
  src: string;
  thumbnailSrc: string;
  alt: string;
  width: number;
  height: number;
  placeholderColor: string | null;
  source?: {
    name: string;
    url: string;
    author: string;
    authorUrl: string;
  };
};

export type PhotoFeedPage = {
  photos: Photo[];
  hasMore: boolean;
  ok: boolean;
};

export type Collection = {
  id: string;
  title: string;
  photoCount: number;
  coverSrc: string | null;
  description: string | null;
  publishedAt: string;
};

export type PhotoContext = {
  photo: Photo;
  prevId: string | null;
  nextId: string | null;
  index: number;
  total: number;
};

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
