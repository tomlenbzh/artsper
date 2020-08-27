import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, AuthCredentials } from '../models/auth.model';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL = 'https://www.artsper.com/api/auth-v2';

  constructor(
    private http: HttpClient,
    private platformService: PlatformService,
  ) { }

  /**
   * getToken()
   * Retrieves token from localstorage
   */
  public getAccessToken(): string {
    if (this.platformService.isPlatformBrowser()) {
      return localStorage.getItem('userProfile');
    }
  }

  /**
   * logIn()
   * @param email: string
   * @param password: string
   * POST Email and Password
   */
  public logIn(credentials: AuthCredentials): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<User>(`${this.BASE_URL}/login`, credentials, options);
  }
}
