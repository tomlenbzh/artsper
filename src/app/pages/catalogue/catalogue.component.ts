import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { LogOut } from '../../store/actions/auth.actions';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  constructor(private store: Store<AppState>, private catalogueService: CatalogueService) { }

  ngOnInit(): void {
    this.getCatalogue();
  }

  /**
   * getCatalogue()
   * Retrieves the artworks in the catalogue
   */
  private getCatalogue(): void {
    this.catalogueService.getCatalogue()
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
