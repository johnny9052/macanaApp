import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacasDetailPage } from './vacas-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VacasDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacasDetailPageRoutingModule {}
