import { CatalogFilter } from '../models/filters.model';
import { ArtworksFilters } from '../models/catalog.model';

export const CategoryFilter: CatalogFilter[] = [
  { id: '6', label: 'Painting' },
  { id: '9', label: 'Photography' },
  { id: '5', label: 'Sculpture' },
  { id: '23', label: 'Drawing' },
  { id: '15', label: 'Print' }
];

export const PriceFilter: CatalogFilter[] = [
  { id: '0-500', label: '500 €' },
  { id: '500-1000', label: '500 € - 1 000 €' },
  { id: '1000-2500', label: '1 000 € - 2 500 €' },
  { id: '2500-5000', label: '2 500 € - 5 000 €' },
  { id: '5000-10000', label: '5 000 € - 10 000 €' },
  { id: '10000-50000', label: '10 000 € - 50 000 €' }
];

export const SortFilter: CatalogFilter[] = [
  { id: '1', label: 'A-Z sort' },
  { id: '2', label: 'Z-A sort' },
  { id: '3', label: 'ASC price' },
  { id: '4', label: 'DESC price' },
  { id: '11', label: 'Recently added' },
  { id: '13', label: 'By popularity' }
];

export const ItemsPerPageFilter: CatalogFilter[] = [
  { id: '60', label: '60 Items per page' },
  { id: '100', label: '100 Items per page' },
  { id: '200', label: '200 Items per page' },
];

export const StatusFilter: CatalogFilter[] = [
  { id: 'status1', label: 'Awaiting for aproval Artworks' },
  { id: 'status2', label: 'Approved Artworks' },
  { id: 'status3', label: 'Rejected Artworks' },
  { id: 'status4', label: 'Inactived Artworks' },
  { id: 'status5', label: 'Saved Artworks' },
  { id: 'status6', label: 'Archived Artworks' },
  { id: 'Total', label: 'All Artworks' },
  { id: 'Soldout', label: 'All Soldout Artworks' },
  { id: 'Promotions ', label: 'All discounted Artworks' },
];

export const initalFilters: ArtworksFilters = {
  search: null,
  category: null,
  sort: SortFilter[4].id,
  price: null,
  ipp: ItemsPerPageFilter[0].id,
  status: [StatusFilter[1].id],
  page: 1,
};
