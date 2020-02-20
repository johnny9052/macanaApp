import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotreroDetailPage } from './potrero-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PotreroDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotreroDetailPageRoutingModule {}
