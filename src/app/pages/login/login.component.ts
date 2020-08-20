import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuth } from '../../store/reducers/index';
import { LogIn, LogOut } from '../../store/actions/auth.actions';
import { AuthCredentials, User } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  getAuthState: Observable<any>;
  errorMessage: string | null;
  isAuthenticated: boolean | null;
  user: User | null;

  constructor(private store: Store<AppState>) {
    this.getAuthState = this.store.select(selectAuth);
  }

  ngOnInit(): void {
    this.getAuthState.subscribe((state) => {
      this.user = state.user;
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;

      console.log(`this.user:`, this.user);
      console.log(`this.isAuthenticated: ${this.isAuthenticated}`);
      console.log(`this.errorMessage: ${this.errorMessage}`);
    });
  }

  /**
   * login()
   * Logs the user in the application
   */
  public login(): void {
    const payload: AuthCredentials = { email: 'superhero@artsper-candidate.com', password: 'candidate' };
    this.store.dispatch(new LogIn(payload));
  }

  /**
   * logout()
   * Logs the user out of the application
   */
  public logout(): void {
    this.store.dispatch(new LogOut());
  }
}
