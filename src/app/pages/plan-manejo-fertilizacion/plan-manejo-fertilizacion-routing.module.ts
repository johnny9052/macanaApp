import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFertilizacionPage } from './plan-manejo-fertilizacion.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFertilizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFertilizacionPageRoutingModule {}
