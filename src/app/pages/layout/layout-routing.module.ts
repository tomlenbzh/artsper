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
        path: 'catalogue',
        loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule),
        canActivate: [AuthenticationGuard]
      },
      { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
