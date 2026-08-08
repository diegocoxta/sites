export interface ApiResponse {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

export interface Urls {
  next: string;
  last: string;
}

export interface Want {
  id: number;
  resource_url: string;
  date_added: string;
  basic_information: BasicInformation;
  rating: number;
}

export interface Release {
  id: number;
  instance_id: number;
  date_added: string;
  rating: number;
  basic_information: BasicInformation;
}

export interface Instance extends Release {
  folder_id: number;
  notes: Note[];
  fields: Field[];
}

export interface BasicInformation {
  id: number;
  master_id: number;
  master_url?: string;
  resource_url: string;
  thumb: string;
  cover_image: string;
  title: string;
  year: number;
  formats: Format[];
  labels: Label[];
  artists: Artist[];
  genres: string[];
  styles: string[];
}

export interface Format {
  name: string;
  qty: string;
  text?: string;
  descriptions: string[];
}

export interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}

export interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

export interface Folder {
  id: number;
  name: string;
  count: number;
  resource_url: string;
  releases: Release[];
}

export interface Company {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
  thumbnail_url?: string;
}

export interface Community {
  have: number;
  want: number;
  rating: Rating;
  submitter: Submitter;
  contributors: Contributor[];
  data_quality: string;
  status: string;
}

export interface Rating {
  count: number;
  average: number;
}

export interface Submitter {
  username: string;
  resource_url: string;
}

export interface Contributor {
  username: string;
  resource_url: string;
}

export interface Identifier {
  type: string;
  value: string;
}

export interface Video {
  uri: string;
  title: string;
  description: string;
  duration: number;
  embed: boolean;
}

export interface Tracklist {
  position: string;
  type_: string;
  artists: Artist[];
  title: string;
  duration: string;
}

export interface Image {
  type: string;
  uri: string;
  resource_url: string;
  uri150: string;
  width: number;
  height: number;
}

export interface ReleaseDetails {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: Artist[];
  artists_sort: string;
  labels: Label[];
  series: unknown[];
  companies: Company[];
  formats: Format[];
  data_quality: string;
  community: Community;
  format_quantity: number;
  date_added: string;
  date_changed: string;
  num_for_sale: number;
  lowest_price: number;
  master_id: number;
  master_url: string;
  title: string;
  country: string;
  released: string;
  released_formatted: string;
  identifiers: Identifier[];
  videos: Video[];
  genres: string[];
  styles: string[];
  tracklist: Tracklist[];
  images: Image[];
  thumb: string;
  estimated_weight: number;
  blocked_from_sale: boolean;
  is_offensive: boolean;
}

export interface Note {
  field_id: number;
  value: string;
}

export interface Field {
  id: number;
  name: string;
  type: string;
  position: number;
  public: boolean;
  options?: string[];
  lines?: number;
}
