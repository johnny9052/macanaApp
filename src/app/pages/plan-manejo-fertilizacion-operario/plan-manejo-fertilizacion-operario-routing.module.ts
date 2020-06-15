import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFertilizacionOperarioPage } from './plan-manejo-fertilizacion-operario.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFertilizacionOperarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFertilizacionOperarioPageRoutingModule {}
