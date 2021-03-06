import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { Store } from '@ngrx/store';
import { AppState, selectArtworksFilters, selectIsArtworksListLoading } from '../../store/store';
import { ApplyFilters } from '../../store/actions/catalog.actions';

import { CatalogFilter } from '../../models/filters.model';
import { ArtworksFilters } from '../../models/catalog.model';
import { CategoryFilter, PriceFilter, SortFilter, ItemsPerPageFilter, StatusFilter, initalFilters } from '../../data/filters.data';

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
  public toggleSidnavSubscription$: Subscription;

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
    private scrollToService: ScrollToService
  ) {
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
        isLoading ? this.filtersForm.controls.status.disable() : this.filtersForm.controls.status.enable();
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
    this.isLoadingSubscription$.unsubscribe();
  }

  /**
   * submitForm()
   * Applies new filters to the research
   */
  public submitForm(): void {
    const newFilter: ArtworksFilters = this.filtersForm.value;
    this.store.dispatch(new ApplyFilters(newFilter));
    this.scrollTo('#top');
  }

  /**
   * resetFilters()
   * Reset filters to their initial state
   */
  public resetFilters(): void {
    const newFilter: ArtworksFilters = initalFilters;
    this.store.dispatch(new ApplyFilters(initalFilters));
    this.scrollTo('#top');
  }

  /**
   * clearAllFilters()
   * Removes all filters on the research
   */
  public clearAllFilters(): void {
    this.filtersForm.controls.search.patchValue(null);
    this.filtersForm.controls.sort.patchValue(null);
    this.filtersForm.controls.category.patchValue(null);
    this.filtersForm.controls.price.patchValue(null);
    this.filtersForm.controls.ipp.patchValue(null);
    this.filtersForm.controls.page.patchValue(null);
    this.filtersForm.controls.status.patchValue(null);
    this.store.dispatch(new ApplyFilters(this.filtersForm.value));
    this.scrollTo('#top');
  }

  private scrollTo(target: string): void {
    const config: ScrollToConfigOptions = { target, duration: 1500, offset: -100 };
    this.scrollToService.scrollTo(config);
  }
}
