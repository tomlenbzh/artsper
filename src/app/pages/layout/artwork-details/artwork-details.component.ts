import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ArtworkDetailsService } from '../../../services/artwork-details.service';
import { PlatformService } from '../../../services/platform.service';

import { NgImageSliderComponent } from 'ng-image-slider';
import * as moment from 'moment';

@Component({
  selector: 'app-artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrls: ['./artwork-details.component.scss']
})
export class ArtworkDetailsComponent implements OnInit {

  @ViewChild('nav') slider: NgImageSliderComponent;

  private artwork: any;
  public isLoading: boolean;

  public title: string;
  public artist: string;
  public category: string;
  public name: string;
  public dimensions: string;
  public price: string;
  public promotion: string;
  public dateCreated: any;

  public galleryInfo: any;

  public imagesGallery: any;
  public errorImg: string;
  public limitedEdition: boolean;

  constructor(
    private router: Router,
    private artworkDetailsService: ArtworkDetailsService,
    private platformService: PlatformService
  ) { }

  ngOnInit(): void {

    if (this.platformService.isPlatformBrowser()) {
      this.artworkDetailsService.artworkExists()
        ? (this.artwork = this.artworkDetailsService.getArtworkDetails(), this.initArtwork())
        : this.router.navigateByUrl('/catalogue');
    }
  }

  private initArtwork(): void {

    this.imagesGallery = this.artwork?.images[0]?.absolute_path;
    this.errorImg = `https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png`;
    this.title = this.artwork?.artwork_title || '???';
    this.artist = this.artworkDetailsService.getArtistName(this.artwork);
    this.category = this.artwork?.category?.label.en || '???';
    this.dimensions = this.artworkDetailsService.getDimensions(this.artwork);
    this.price = this.artworkDetailsService.getPrice(this.artwork);
    this.promotion = this.artwork?.promotion ? `-${this.artwork?.promotion.percentage * 100}%` : null;
    this.dateCreated = moment(new Date(this.artwork?.date_created)).format('MMMM Do YYYY, h:mm:ss a');
    this.galleryInfo = this.artwork?.gallery;
    this.limitedEdition = this.artwork?.limited_edition;

    this.imagesGallery = this.artwork?.images.map((image: any) => {
      if (image) {
        return {
          image: image.absolute_path,
          thumbImage: image?.absolute_path,
          alt: '',
          title: ''
        };
      }
    });
  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
}
