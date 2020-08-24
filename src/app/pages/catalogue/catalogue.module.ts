import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [CatalogueComponent],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class CatalogueModule { }
