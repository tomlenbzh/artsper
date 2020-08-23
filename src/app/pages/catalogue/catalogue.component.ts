import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectCatalog } from '../../store/store';
import { LogOut } from '../../store/actions/auth.actions';
import { CatalogueService } from '../../services/catalogue.service';
import { FetchArtworks } from '../../store/actions/catalog.actions';
import { ArtworkList } from '../../models/catalog.model';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  getCatalogState: Observable<any>;
  artworksList: any[] = null;
  regularDistribution = 100 / 3;

  constructor(private store: Store<AppState>, private catalogueService: CatalogueService) {
    this.getCatalogState = this.store.select(selectCatalog);
  }

  ngOnInit(): void {
    // this.getCatalogue();
    this.getCatalogState.subscribe((state) => {
      if (state.artworksList !== null) {
        this.artworksList = state.artworksList;
        console.log('[this.artworksList]', this.artworksList);
      }
    });
    this.store.dispatch(new FetchArtworks({}));
  }

  /**
   * getCatalogue()
   * Retrieves the artworks in the catalogue
   */
  private getCatalogue(): void {
    this.catalogueService.getCatalogue('')
      .subscribe((response) => {
        console.log('[CATALOGUE RESPONSE]', response);
      });
  }

  /**
   * logout()
   * Logs the user out of the application
   */
  public logout(): void {
    this.store.dispatch(new LogOut());
  }

}
