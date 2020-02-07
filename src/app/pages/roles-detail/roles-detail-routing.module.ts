import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesDetailPage } from './roles-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RolesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesDetailPageRoutingModule {}
