import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    ArtworkCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ArtworkCardComponent
  ],
  entryComponents: [
    ArtworkCardComponent
  ]
})
export class SharedModule { }
