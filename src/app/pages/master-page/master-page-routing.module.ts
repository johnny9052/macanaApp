import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterPagePage } from './master-page.page';

const routes: Routes = [
  {
    path: '',
    component: MasterPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPagePageRoutingModule {}
