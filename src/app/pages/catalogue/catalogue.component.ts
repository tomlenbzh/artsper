import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatOption } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';

import { AppState, selectCatalog } from '../../store/store';
import { LogOut } from '../../store/actions/auth.actions';
import { FetchArtworks } from '../../store/actions/catalog.actions';
import { CatalogFilter } from '../../models/filters.model';
import { CategoryFilter, PriceFilter, SortFilter, ItemsPerPageFilter, StatusFilter } from '../../data/filters.data';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  totalRecords: number;
  currentPage: number;
  pagesNumber: number;

  filtersForm = new FormGroup({
    search: new FormControl(),
    category: new FormControl(),
    sort: new FormControl(),
    price: new FormControl(),
    ipp: new FormControl(),
    status: new FormControl(),
    page: new FormControl(),
  });

  getCatalogState: Observable<any>;
  catalogStateSubscription: Subscription;
  artworksList: any[] = null;
  pagination: any;

  categoryFilter: CatalogFilter[] = CategoryFilter;
  priceFilter: CatalogFilter[] = PriceFilter;
  sortFilter: CatalogFilter[] = SortFilter;
  itemsPerPageFilter: CatalogFilter[] = ItemsPerPageFilter;
  statusFilter: CatalogFilter[] = StatusFilter;

  constructor(private store: Store<AppState>) {
    this.getCatalogState = this.store.select(selectCatalog);
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.initAllFilters();
    this.catalogStateSubscription = this.getCatalogState.subscribe((state) => {
      if (state.artworksList !== null) {
        this.artworksList = state.artworksList.data;
        this.pagination = state.artworksList.meta;
        this.pagesNumber = this.pagination.total_items / this.pagination.current_items;
        console.log('[this.artworksList]', this.artworksList);
        console.log('[this.pagination]', this.pagination);
      }
    });
    this.store.dispatch(new FetchArtworks(this.filtersForm.value));
  }

  ngOnDestroy(): void {
    this.catalogStateSubscription.unsubscribe();
  }

  public cleanSort() {
    this.filtersForm.controls.sort.patchValue(null);
  }

  public cleanSearch() {
    this.filtersForm.controls.search.patchValue(null);
  }

  public cleanPrice() {
    this.filtersForm.controls.price.patchValue(null);
  }

  public cleanCategory() {
    this.filtersForm.controls.category.patchValue(null);
  }

  public cleanIpp() {
    this.filtersForm.controls.ipp.patchValue(this.itemsPerPageFilter[0].id);
  }

  public cleanStatus() {
    this.filtersForm.controls.status.patchValue(null);
    // this.filtersForm.controls.status.patchValue(this.statusFilter[1].id);
  }

  private setFilterPage(page: number): void {
    this.filtersForm.controls.page.patchValue(page);
  }

  public initAllFilters(): void {
    this.cleanSearch();
    this.cleanSort();
    this.cleanPrice();
    this.cleanCategory();
    this.cleanIpp();
    this.cleanStatus();
    this.setFilterPage(this.currentPage);
  }

  /**
   * filterArtworks()
   * Applies filters to selection
   */
  public applyFilters(): void {
    console.log('Filters Form', this.filtersForm.value);
    this.currentPage = 1;
    this.setFilterPage(1);
    this.store.dispatch(new FetchArtworks(this.filtersForm.value));
  }

  /**
   * logout()
   * Logs the user out of the application
   */
  public logout(): void {
    this.store.dispatch(new LogOut());
  }

  public changePage($event: any) {
    this.currentPage = $event;
    this.setFilterPage(this.currentPage);
    console.log('[CURRENT PAGE:]', this.currentPage);
    this.store.dispatch(new FetchArtworks(this.filtersForm.value));
  }
}
