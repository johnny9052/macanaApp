import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoPage } from './plan-manejo.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoPageRoutingModule {}
