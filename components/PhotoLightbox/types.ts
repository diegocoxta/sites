export type LightboxPhoto = {
  id: string;
  alt_description: string | null;
  width: number;
  height: number;
  color: string | null;
  likes: number;
  urls: {
    regular: string;
  };
  links: {
    html: string;
  };
};

export interface PhotoLightboxLabels {
  close: string;
  previous: string;
  next: string;
  viewOnUnsplash: string;
  like: string;
  likes: string;
  alsoIn: string;
  exif: {
    camera: string;
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
    location: string;
  };
}
