import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuth } from '../../store/store';
import { LogIn } from '../../store/actions/auth.actions';
import { AuthCredentials, User } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  getAuthState: Observable<any>;
  isLoading: boolean | null;
  isAuthenticated: boolean | null;
  user: User | null;
  errorMessage: string | null;
  credentials: AuthCredentials;

  constructor(private store: Store<AppState>) {
    this.getAuthState = this.store.select(selectAuth);
  }

  ngOnInit(): void {
    this.credentials = { email: '', password: '' };
    this.getAuthState.subscribe((state) => {
      this.user = state.user;
      this.isAuthenticated = state.isAuthenticated;
      this.errorMessage = state.errorMessage;
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy(): void { }

  /**
   * login()
   * Logs the user in the application
   */
  public login(): void {
    // const payload: AuthCredentials = { email: 'superhero@artsper-candidate.com', password: 'candidate' };
    this.store.dispatch(new LogIn(this.loginForm.value));
  }

}
