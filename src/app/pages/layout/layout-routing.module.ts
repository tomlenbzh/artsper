import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../../tools/guards/authentication.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthenticationGuard]
      }, {
        path: 'catalogue',
        loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule),
        canActivate: [AuthenticationGuard]
      }, {
        path: 'artwork-details',
        loadChildren: () => import('./artwork-details/artwork-details.module').then(m => m.ArtworkDetailsModule),
        canActivate: [AuthenticationGuard]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
