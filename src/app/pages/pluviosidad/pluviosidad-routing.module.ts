import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PluviosidadPage } from './pluviosidad.page';

const routes: Routes = [
  {
    path: '',
    component: PluviosidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluviosidadPageRoutingModule {}
