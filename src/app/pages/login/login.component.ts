import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState, selectAuth } from '../../store/store';
import { LogIn, LoadingAuthStart } from '../../store/actions/auth.actions';
import { AuthCredentials } from '../../models/auth.model';

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

  public loginBackground = `https://www.wallpapertip.com/wmimgs/77-774852_leonid-afremov-late-stroll.jpg`;
  public artsperLogo = `https://blog.artsper.com/wp-content/uploads/2018/06/Logo_Black.png`;

  private getAuthState$: Observable<any>;
  private authStateSubscription$: Subscription;

  public isLoading: boolean;
  private credentials: AuthCredentials;

  constructor(private store: Store<AppState>) {
    this.getAuthState$ = this.store.select(selectAuth);
  }

  ngOnInit(): void {
    this.credentials = { email: '', password: '' };
    this.authStateSubscription$ = this.getAuthState$.subscribe((state) => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.authStateSubscription$.unsubscribe();
  }

  /**
   * login()
   * Logs the user in the application
   */
  public login(): void {
    this.store.dispatch(new LoadingAuthStart({}));
    this.store.dispatch(new LogIn(this.loginForm.value));
  }

  /**
   * get email()
   * Allows to access email formControl in the template
   */
  get email() { return this.loginForm.get('email'); }

  /**
   * get password()
   * Allows to access password formControl in the template
   */
  get password() { return this.loginForm.get('password'); }
}
