import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanDeManejoDetailPage } from './plan-de-manejo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlanDeManejoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDeManejoDetailPageRoutingModule {}
