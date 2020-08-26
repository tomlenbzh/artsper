import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState, selectAuth } from '../../store/store';
import { LogOut } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

  /**
   * logout()
   * Logs the user out of the application
   */
  public logout(): void {
    this.store.dispatch(new LogOut({}));
  }
}
