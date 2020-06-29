import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FetilizanteDetailPage } from './fetilizante-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FetilizanteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FetilizanteDetailPageRoutingModule {}
