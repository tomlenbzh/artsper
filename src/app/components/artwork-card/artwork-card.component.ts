import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArtworkDetailsService } from '../../services/artwork-details.service';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss']
})
export class ArtworkCardComponent implements OnInit {

  @Input() public artwork: any | null;
  public errorImg: string;
  public artworkImg: string;
  public title: string;
  public artist: string;
  public category: string;
  public dimensions: string;
  public price: string;
  public promotion: string;

  constructor(
    private router: Router,
    private artworkDetailsService: ArtworkDetailsService
  ) { }

  ngOnInit(): void {
    this.initArtwork();
  }

  private initArtwork(): void {
    this.artworkImg = this.artwork?.images[0]?.absolute_path;
    this.errorImg = `https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png`;
    this.title = this.artwork?.artwork_title || '???';
    this.artist = this.artworkDetailsService.getArtistName(this.artwork);
    this.category = this.artwork?.category?.label.en || '???';
    this.dimensions = this.artworkDetailsService.getDimensions(this.artwork);
    this.price = this.artworkDetailsService.getPrice(this.artwork);
    this.promotion = `-${this.artwork?.promotion?.percentage * 100}%`;
  }



  public artworkDetails(artwork: any) {
    this.artworkDetailsService.setArtworkDetails(artwork);
    this.router.navigateByUrl('/artwork-details');
  }
}
