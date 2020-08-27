import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworkDetailsRoutingModule } from './artwork-details-routing.module';
import { ArtworkDetailsComponent } from './artwork-details.component';
import { SharedModule } from '../../../components/shared.module';
import { MaterialModule } from '../../../material.module';

import { NgImageSliderModule } from 'ng-image-slider';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [ArtworkDetailsComponent],
  imports: [
    CommonModule,
    ArtworkDetailsRoutingModule,
    SharedModule,
    MaterialModule,
    NgImageSliderModule,
    LazyLoadImageModule
  ]
})
export class ArtworkDetailsModule { }
