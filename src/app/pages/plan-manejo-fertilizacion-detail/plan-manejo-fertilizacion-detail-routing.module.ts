import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFertilizacionDetailPage } from './plan-manejo-fertilizacion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFertilizacionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFertilizacionDetailPageRoutingModule {}
