export type GalleryPhoto = {
  id: string;
  alt_description: string | null;
  width: number;
  height: number;
  color: string | null;
  urls: {
    regular: string;
  };
};

export type GalleryPage = {
  photos: GalleryPhoto[];
  hasMore: boolean;
  ok: boolean;
};
