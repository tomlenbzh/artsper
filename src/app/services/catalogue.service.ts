import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private http: HttpClient) { }

  public getCatalogue(filters: any): Observable<any> {
    const url = this.buildUrl(filters);
    return this.http.get<any>(url);
  }

  private buildUrl(filters: any): string {
    const baseUrl = `https://www.artsper.com/api/artworks?`
      + `${this.setPageFilter(filters.page)}`
      + `${this.setIppFilter(filters.ipp)}`
      + `${this.setCategoryFilters(filters.category)}`
      + `${this.setSearchFilter(filters.search)}`
      + `${this.setSortFilter(filters.sort)}`
      + `${this.setPriceFilter(filters.price)}`
      + `${this.setStatusFilters(filters.status)}`;
    console.log('baseUrl', baseUrl);

    return baseUrl;
  }

  private setPageFilter(page: number): string {
    return (page === null) ? '' : `page=${page}`;
  }

  private setPriceFilter(price: string | null): string {
    return (price === null) ? '' : `&price=${price}`;
  }

  private setSortFilter(sort: string | null): string {
    return (sort === null) ? '' : `&sort=${sort}`;
  }

  private setCategoryFilters(categories: string[] | null): string {
    if (categories === null) {
      return '';
    } else if (categories.length === 1) {
      return `&id_category=${categories[0]}`;
    } else {
      let url = '';
      categories.map((category: string) => {
        url = `${url}&id_category[]=${category}`;
      });
      return url;
    }
  }

  private setStatusFilters(statuses: string[] | null): string {
    if (statuses === null) {
      return '';
    } else if (statuses.length === 1) {
      return `&statuses=${statuses[0]}`;
    } else {
      let url = '';
      statuses.map((status: string) => {
        url = `${url}&statuses[]=${status}`;
      });
      return url;
    }
  }

  private setIppFilter(ipp: string): string {
    return (ipp === null) ? '' : `&ipp=${ipp}`;
  }

  private setSearchFilter(search: string | null): string {
    return (search === null || search === '') ? '' : `&search=${search}`;
  }
}
