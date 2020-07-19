import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionPage } from './plan-manejo-fumigacion.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionPageRoutingModule {}
