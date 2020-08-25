import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss']
})
export class ArtworkCardComponent implements OnInit {

  @Input() artwork: any | null;
  title: string;
  artist: string;
  category: string;
  dimensions: string;
  price: string;
  promotion: string;

  constructor() { }

  ngOnInit(): void {
    this.initArtwork();
  }

  private initArtwork(): void {
    this.title = this.artwork?.artwork_title || '???';
    this.artist = this.getArtistName();
    this.category = this.artwork?.category?.label.en || '???';
    this.dimensions = this.getDimensions();
    this.price = this.getPrice();
    this.promotion = `-${this.artwork?.promotion?.percentage * 100}%`;
  }

  private getArtistName(): string {
    if (!this.artwork?.artist?.artist_firstname && !this.artwork?.artist?.artist_lastname) {
      return '???';
    } else if (!this.artwork?.artist?.artist_firstname) {
      return this.artwork?.artist?.artist_lastname;
    } else if (!this.artwork?.artist?.artist_lastname) {
      return this.artwork?.artist?.artist_firstname;
    } else {
      return `${this.artwork?.artist?.artist_firstname} ${this.artwork?.artist?.artist_lastname}`;
    }
  }

  private getDimensions(): string {
    return !this.artwork?.artwork_dimension_h ? '???'
      : `${this.artwork?.artwork_dimension_h} x ${this.artwork?.artwork_dimension_l} x ${this.artwork?.artwork_dimension_w}`;
  }

  private getPrice(): string {
    return !this.artwork?.artwork_price ? '???'
      : `${this.artwork?.artwork_price} ${this.artwork?.currency?.sign}`;
  }
}
