import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AforoDetailPage } from './aforo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AforoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AforoDetailPageRoutingModule {}
