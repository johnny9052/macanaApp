import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotacionesDetailPage } from './rotaciones-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RotacionesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotacionesDetailPageRoutingModule {}
