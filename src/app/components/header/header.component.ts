import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, selectAuthEmail } from '../../store/store';
import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userEmail$: Observable<any>;
  public artsperLogo = `https://blog.artsper.com/wp-content/uploads/2018/06/Logo_Black.png`;

  constructor(private store: Store<AppState>) {
    this.userEmail$ = this.store.select(selectAuthEmail);
  }

  ngOnInit(): void { }

  /**
   * logout()
   * Logs the user out of the application
   */
  public logout(): void {
    this.store.dispatch(new LogOut({}));
  }
}
