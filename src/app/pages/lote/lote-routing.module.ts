import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LotePage } from './lote.page';

const routes: Routes = [
  {
    path: '',
    component: LotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LotePageRoutingModule {}
