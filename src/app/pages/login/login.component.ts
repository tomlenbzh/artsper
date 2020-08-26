import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppState, selectAuth } from '../../store/store';
import { LogIn, LogBackIn, LoadingAuthStart } from '../../store/actions/auth.actions';
import { AuthCredentials, User } from '../../models/auth.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  getAuthState: Observable<any>;
  authStateSubscription: Subscription;

  isLoading: boolean;
  credentials: AuthCredentials;

  constructor(
    private store: Store<AppState>,
  ) {
    this.getAuthState = this.store.select(selectAuth);
  }

  ngOnInit(): void {
    this.credentials = { email: '', password: '' };
    this.authStateSubscription = this.getAuthState.subscribe((state) => {
      this.isLoading = state.isLoading;
      console.log('IS LOADING:', this.isLoading);
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  /**
   * login()
   * Logs the user in the application
   */
  public login(): void {
    this.store.dispatch(new LoadingAuthStart({}));
    this.store.dispatch(new LogIn(this.loginForm.value));
  }
}
