import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtworkDetailsComponent } from './artwork-details.component';

const routes: Routes = [
  { path: '', component: ArtworkDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworkDetailsRoutingModule { }
