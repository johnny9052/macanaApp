import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadDetailPage } from './actividad-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadDetailPageRoutingModule {}
