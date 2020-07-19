import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionInsumoPage } from './plan-manejo-fumigacion-insumo.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionInsumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionInsumoPageRoutingModule {}
