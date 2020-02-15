import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoClimatologicoDetailPage } from './estado-climatologico-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoClimatologicoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoClimatologicoDetailPageRoutingModule {}
