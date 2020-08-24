import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import { MaterialModule } from '../material.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    ArtworkCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPaginationModule,
    LazyLoadImageModule
  ],
  exports: [
    ArtworkCardComponent
  ],
  entryComponents: [
    ArtworkCardComponent
  ]
})
export class SharedModule { }
