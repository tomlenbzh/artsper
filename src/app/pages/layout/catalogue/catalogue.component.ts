import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  AppState,
  selectArtworksListData,
  selectArtworksListMeta,
  selectIsArtworksListLoading,
  selectArtworksListError,
  selectAuthEmail,
  selectArtworksFilters
} from '../../../store/store';

import { FetchArtworks, LoadingArtworksStart, ApplyFilters } from '../../../store/actions/catalog.actions';
import { PlatformService } from '../../../services/platform.service';

import { AuthenticationService } from '../../../services/authentication.service';

import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { initalFilters } from '../../../data/filters.data';
import { ArtworksFilters } from 'src/app/models/catalog.model';

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

  artworksList$: Observable<any[]>;
  isLoading$: Observable<boolean | null>;
  errorMessage$: Observable<string | null>;

  artworksMeta$: Observable<any>;
  userEmail$: Observable<string>;

  artworksMetaSubscription$: Subscription;
  isLoadingSubscription$: Subscription;
  userEmailSubscription$: Subscription;

  showLoader: boolean;
  pagination: any;

  private filters$: Observable<ArtworksFilters>;
  private filtersSubscription$: Subscription;

  public currentFilters: ArtworksFilters;

  constructor(
    private store: Store<AppState>,
    private platformService: PlatformService,
    private scrollToService: ScrollToService
  ) {
    this.currentPage = 1;
    this.artworksList$ = this.store.select(selectArtworksListData);
    this.artworksMeta$ = this.store.select(selectArtworksListMeta);
    this.isLoading$ = this.store.select(selectIsArtworksListLoading);
    this.errorMessage$ = this.store.select(selectArtworksListError);
    this.userEmail$ = this.store.select(selectAuthEmail);
    this.filters$ = this.store.select(selectArtworksFilters);
  }

  ngOnInit(): void {

    if (this.platformService.isPlatformBrowser) {

      this.showLoader = false;
      this.document = this.platformService.windowRefService.nativeWindow.document;
      this.overlayElement = this.document.querySelector('#overlay');

      this.store.dispatch(new ApplyFilters(initalFilters));
      this.filtersSubscription$ = this.filters$.subscribe((newFilters: ArtworksFilters) => {
        if (newFilters !== undefined) {
          this.currentFilters = newFilters;
          this.store.dispatch(new LoadingArtworksStart({}));
          this.store.dispatch(new FetchArtworks(newFilters));
        }
      });
      this.artworksMetaSubscription$ = this.artworksMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta;
          this.pagesNumber = this.pagination?.total_items / this.pagination?.current_items;
        }
      });
      this.isLoadingSubscription$ = this.isLoading$.subscribe((value: boolean) => {
        this.showLoader = value;
        value === true ? disableBodyScroll(this.overlayElement) : enableBodyScroll(this.overlayElement);
      });
    }
  }

  ngOnDestroy(): void {
    clearAllBodyScrollLocks();
    this.artworksMetaSubscription$.unsubscribe();
    this.isLoadingSubscription$.unsubscribe();
    this.filtersSubscription$.unsubscribe();
  }

  public changePage($event: any) {

    const newFilters: ArtworksFilters = {
      sort: this.currentFilters.sort,
      search: this.currentFilters.search,
      category: this.currentFilters.category,
      page: $event,
      ipp: this.currentFilters.ipp,
      price: this.currentFilters.price,
      status: this.currentFilters.status
    };

    this.store.dispatch(new ApplyFilters(newFilters));
    this.scrollTo('#top');
  }

  private scrollTo(target: string): void {
    const config: ScrollToConfigOptions = { target, duration: 1500, offset: -100 };
    this.scrollToService.scrollTo(config);
  }
}
