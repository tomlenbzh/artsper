import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../components/shared.module';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    MaterialModule,
    SharedModule,
    LazyLoadImageModule,
    RouterModule
  ]
})
export class PageNotFoundModule { }
