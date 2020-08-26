import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../components/shared.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class LayoutModule { }
