import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../components/shared.module';
import { MaterialModule } from '../../../material.module';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    LazyLoadImageModule
  ]
})
export class HomeModule { }
