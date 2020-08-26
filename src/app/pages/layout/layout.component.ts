import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectSidenav } from '../../store/store';

import { OpenSidenav, CloseSidenav } from '../../store/actions/sidenav.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public toggleSidenavObsv: Observable<boolean>;
  public sidenabSubscription: Subscription;
  public mode = 'side';
  public isOpen = true;

  constructor(
    private store: Store<AppState>,
  ) {
    this.toggleSidenavObsv = this.store.select(selectSidenav);
  }

  ngOnInit(): void {
    this.sidenabSubscription = this.toggleSidenavObsv.subscribe((isOpen: boolean) => {
      console.log('ISOPEN', isOpen);
      if (isOpen !== undefined) {
        this.isOpen = isOpen;
      }
    });
  }

  ngOnDestroy(): void {
    this.sidenabSubscription.unsubscribe();
  }

  public toggleSidenav(): void {
    console.log('TOGGLE');
    this.isOpen ? this.store.dispatch(new CloseSidenav({})) : this.store.dispatch(new OpenSidenav({}));
  }
}
