import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFertilizacionFertilizantePage } from './plan-manejo-fertilizacion-fertilizante.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFertilizacionFertilizantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFertilizacionFertilizantePageRoutingModule {}
