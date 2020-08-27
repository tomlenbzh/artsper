import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtworkDetailsRoutingModule } from './artwork-details-routing.module';
import { ArtworkDetailsComponent } from './artwork-details.component';
import { SharedModule } from '../../../components/shared.module';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [ArtworkDetailsComponent],
  imports: [
    CommonModule,
    ArtworkDetailsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ArtworkDetailsModule { }
