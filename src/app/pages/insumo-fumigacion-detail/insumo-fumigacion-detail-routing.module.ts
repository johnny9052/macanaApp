import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumoFumigacionDetailPage } from './insumo-fumigacion-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InsumoFumigacionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumoFumigacionDetailPageRoutingModule {}
