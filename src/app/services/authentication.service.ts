import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, AuthCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL = 'https://www.artsper.com/api/auth-v2';

  constructor(private http: HttpClient) { }

  /**
   * getToken()
   * Retrieves token from localstorage
   */
  public getAccessToken(): string {
    return localStorage.getItem('accessToken');
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
