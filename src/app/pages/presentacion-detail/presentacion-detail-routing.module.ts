import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentacionDetailPage } from './presentacion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PresentacionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentacionDetailPageRoutingModule {}
