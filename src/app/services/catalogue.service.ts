import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  getCatalogue(filters: any): Observable<any> {
    return this.http.get<any>('https://www.artsper.com/api/artworks');
  }
}
