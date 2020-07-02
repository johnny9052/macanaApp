import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMacanaPage } from './info-macana.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMacanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMacanaPageRoutingModule {}
