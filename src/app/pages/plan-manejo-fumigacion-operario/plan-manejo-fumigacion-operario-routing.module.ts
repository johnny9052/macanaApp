import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionOperarioPage } from './plan-manejo-fumigacion-operario.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionOperarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionOperarioPageRoutingModule {}
