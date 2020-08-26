export interface ArtworkList {
  data: any[];
  meta: {};
}

export interface ArtworksFilters {
  search: string | null;
  category: string | string[] | null;
  sort: string | null;
  price: string | null;
  ipp: string | null;
  status: string | string[] | null;
  page: number | null;
}
