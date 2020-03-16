import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanDeManejoPage } from './plan-de-manejo.page';

const routes: Routes = [
  {
    path: '',
    component: PlanDeManejoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDeManejoPageRoutingModule {}
