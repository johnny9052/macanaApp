import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoClimatologicoPage } from './estado-climatologico.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoClimatologicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoClimatologicoPageRoutingModule {}
