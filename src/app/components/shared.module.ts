import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkCardComponent } from './artwork-card/artwork-card.component';
import { MaterialModule } from '../material.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiscountComponent } from './discount/discount.component';
import { ItemsFoundComponent } from './items-found/items-found.component';

@NgModule({
  declarations: [
    ArtworkCardComponent,
    HeaderComponent,
    SidenavComponent,
    DiscountComponent,
    ItemsFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPaginationModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    ArtworkCardComponent,
    HeaderComponent,
    SidenavComponent,
    DiscountComponent,
    ItemsFoundComponent
  ],
  entryComponents: [
    ArtworkCardComponent,
    HeaderComponent,
    SidenavComponent,
    DiscountComponent,
    ItemsFoundComponent
  ]
})
export class SharedModule { }
