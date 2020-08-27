import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtworkDetailsService {

  private artwork: any;

  constructor() {
    this.artwork = null;
  }

  public setArtworkDetails(artwork: any): void {
    this.artwork = artwork;
    localStorage.setItem('artwork', JSON.stringify(this.artwork));
  }

  public getArtworkDetails(): any {
    return JSON.parse(localStorage.getItem('artwork'));
  }

  public artworkExists(): boolean {
    const artwork = localStorage.getItem('artwork');
    return !artwork ? false : true;
  }

  public getArtistName(atwork: any): string {
    if (!atwork?.artist?.artist_firstname && !atwork?.artist?.artist_lastname) {
      return '???';
    } else if (!atwork?.artist?.artist_firstname) {
      return atwork?.artist?.artist_lastname;
    } else if (!atwork?.artist?.artist_lastname) {
      return atwork?.artist?.artist_firstname;
    } else {
      return `${atwork?.artist?.artist_firstname} ${atwork?.artist?.artist_lastname}`;
    }
  }

  public getDimensions(atwork: any): string {
    return !atwork?.artwork_dimension_h ? '???'
      : `${atwork?.artwork_dimension_h} x ${atwork?.artwork_dimension_l} x ${atwork?.artwork_dimension_w}`;
  }

  public getPrice(atwork: any): string {
    return !atwork?.artwork_price ? '???'
      : `${atwork?.artwork_price} ${atwork?.currency?.sign}`;
  }
}
