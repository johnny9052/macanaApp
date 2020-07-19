import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionDetailPage } from './plan-manejo-fumigacion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionDetailPageRoutingModule {}
