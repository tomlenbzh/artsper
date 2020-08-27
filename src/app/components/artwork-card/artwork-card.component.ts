import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArtworkDetailsService } from '../../services/artwork-details.service';
import { PlatformService } from '../../services/platform.service';

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

  private window: Window;

  constructor(
    private router: Router,
    private artworkDetailsService: ArtworkDetailsService,
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {
    if (this.platformService.isPlatformBrowser()) {
      this.window = this.platformService.windowRefService.nativeWindow;
      this.initArtwork();
    }
  }

  /**
   * initArtwork()
   * Initialises the Artworks values
   */
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

  /**
   * artworkDetails()
   * Navigates to the Artwork details component
   */
  public artworkDetails(artwork: any) {
    if (this.platformService.isPlatformBrowser()) {
      this.window.scroll(0, 0);
      this.artworkDetailsService.setArtworkDetails(artwork);
      this.router.navigateByUrl('/artwork-details');
    }
  }
}
