import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectSidenav, selectArtworksFilters, selectIsArtworksListLoading } from '../../store/store';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { CatalogFilter } from '../../models/filters.model';
import { CategoryFilter, PriceFilter, SortFilter, ItemsPerPageFilter, StatusFilter, initalFilters } from '../../data/filters.data';
import { ArtworksFilters } from '../../models/catalog.model';
import { ApplyFilters } from '../../store/actions/catalog.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  public filters$: Observable<ArtworksFilters>;
  public filtersSubscription$: Subscription;

  public isLoading$: Observable<boolean>;
  public isLoadingSubscription$: Subscription;

  public toggleSidnav: Observable<boolean>;
  public mode = 'side';
  public isLoading = false;

  filtersForm = new FormGroup({
    search: new FormControl(),
    category: new FormControl(),
    sort: new FormControl(),
    price: new FormControl(),
    ipp: new FormControl(),
    status: new FormControl(),
    page: new FormControl(),
  });

  categoryFilter: CatalogFilter[] = CategoryFilter;
  priceFilter: CatalogFilter[] = PriceFilter;
  sortFilter: CatalogFilter[] = SortFilter;
  itemsPerPageFilter: CatalogFilter[] = ItemsPerPageFilter;
  statusFilter: CatalogFilter[] = StatusFilter;

  constructor(
    private store: Store<AppState>,
  ) {
    this.toggleSidnav = this.store.select(selectSidenav);
    this.filters$ = this.store.select(selectArtworksFilters);
    this.isLoading$ = this.store.select(selectIsArtworksListLoading);
  }

  ngOnInit(): void {
    this.isLoadingSubscription$ = this.isLoading$.subscribe((isLoading: boolean) => {
      if (isLoading !== undefined) {
        this.isLoading = isLoading;
        isLoading ? this.filtersForm.controls.search.disable() : this.filtersForm.controls.search.enable();
        isLoading ? this.filtersForm.controls.sort.disable() : this.filtersForm.controls.sort.enable();
        isLoading ? this.filtersForm.controls.category.disable() : this.filtersForm.controls.category.enable();
        isLoading ? this.filtersForm.controls.price.disable() : this.filtersForm.controls.price.enable();
        isLoading ? this.filtersForm.controls.ipp.disable() : this.filtersForm.controls.ipp.enable();
        isLoading ? this.filtersForm.controls.page.disable() : this.filtersForm.controls.page.enable();
      }
    });
    this.filtersSubscription$ = this.filters$.subscribe((filters) => {
      this.filtersForm.controls.search.patchValue(filters.search);
      this.filtersForm.controls.sort.patchValue(filters.sort);
      this.filtersForm.controls.category.patchValue(filters.category);
      this.filtersForm.controls.price.patchValue(filters.price);
      this.filtersForm.controls.ipp.patchValue(filters.ipp);
      this.filtersForm.controls.page.patchValue(filters.page);
      this.filtersForm.controls.status.patchValue(filters.status);
    });
  }

  ngOnDestroy(): void {
    this.filtersSubscription$.unsubscribe();
  }

  public submitForm(): void {
    const newFilter: ArtworksFilters = this.filtersForm.value;
    console.log('SUBMIT FORM', newFilter);
    this.store.dispatch(new ApplyFilters(newFilter));
  }

  public resetFilters(): void {
    const newFilter: ArtworksFilters = initalFilters;
    console.log('RESET FILTERS', newFilter);
    this.store.dispatch(new ApplyFilters(initalFilters));
  }

  public clearAllFilters(): void {
    this.filtersForm.controls.search.patchValue(null);
    this.filtersForm.controls.sort.patchValue(null);
    this.filtersForm.controls.category.patchValue(null);
    this.filtersForm.controls.price.patchValue(null);
    this.filtersForm.controls.ipp.patchValue(null);
    this.filtersForm.controls.page.patchValue(null);
    this.filtersForm.controls.status.patchValue(null);
    console.log('RESET FILTERS', this.filtersForm.value);
    this.store.dispatch(new ApplyFilters(this.filtersForm.value));
  }
}