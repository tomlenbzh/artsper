import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  AppState,
  selectArtworksListData,
  selectArtworksListMeta,
  selectIsArtworksListLoading,
  selectArtworksListError
} from '../../store/store';

import { LogOut } from '../../store/actions/auth.actions';
import { FetchArtworks, LoadingStart } from '../../store/actions/catalog.actions';
import { CatalogFilter } from '../../models/filters.model';
import { CategoryFilter, PriceFilter, SortFilter, ItemsPerPageFilter, StatusFilter } from '../../data/filters.data';
import { PlatformService } from '../../services/platform.service';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  private overlayElement = null;
  private document: Document;

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

  artworksList: Observable<any[]>;
  isLoading: Observable<boolean | null>;
  errorMessage: Observable<string | null>;
  // myListSubscription: Subscription;

  myMeta: Observable<any>;
  myMetaSubscription: Subscription;
  isLoadingSubscription: Subscription;

  showLoader: boolean;

  // getCatalogState: Observable<any>;

  pagination: any;

  categoryFilter: CatalogFilter[] = CategoryFilter;
  priceFilter: CatalogFilter[] = PriceFilter;
  sortFilter: CatalogFilter[] = SortFilter;
  itemsPerPageFilter: CatalogFilter[] = ItemsPerPageFilter;
  statusFilter: CatalogFilter[] = StatusFilter;

  constructor(
    private store: Store<AppState>,
    private platformService: PlatformService,
    private scrollToService: ScrollToService
  ) {
    this.currentPage = 1;
    // this.getCatalogState = this.store.select(selectCatalog);
    this.artworksList = this.store.select(selectArtworksListData);
    this.myMeta = this.store.select(selectArtworksListMeta);
    this.isLoading = this.store.select(selectIsArtworksListLoading);
    this.errorMessage = this.store.select(selectArtworksListError);
  }

  ngOnInit(): void {

    if (this.platformService.isPlatformBrowser) {
      this.initAllFilters();
      this.showLoader = false;
      this.document = this.platformService.windowRefService.nativeWindow.document;
      this.overlayElement = this.document.querySelector('#overlay');
      // this.lockBody();
      this.myMetaSubscription = this.myMeta.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta;
          this.pagesNumber = this.pagination?.total_items / this.pagination?.current_items;
        }
      });
      this.isLoadingSubscription = this.isLoading.subscribe((value: boolean) => {
        this.showLoader = value;
        value === true ? disableBodyScroll(this.overlayElement) : enableBodyScroll(this.overlayElement);
      });
      this.store.dispatch(new LoadingStart({}));
      this.store.dispatch(new FetchArtworks(this.filtersForm.value));
    }
  }

  ngOnDestroy(): void {
    clearAllBodyScrollLocks();
    // this.myListSubscription.unsubscribe();
    this.myMetaSubscription.unsubscribe();
  }

  public cleanSort() {
    this.filtersForm.controls.sort.patchValue(this.sortFilter[4].id);
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
    this.filtersForm.controls.status.patchValue([this.statusFilter[1].id]);
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
    this.store.dispatch(new LoadingStart({}));
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
    this.store.dispatch(new LoadingStart({}));
    this.scrollTo('#top');
    this.store.dispatch(new FetchArtworks(this.filtersForm.value));
  }

  private scrollTo(target: string): void {
    const config: ScrollToConfigOptions = { target, duration: 1500, offset: -100 };
    this.scrollToService.scrollTo(config);
  }
}
