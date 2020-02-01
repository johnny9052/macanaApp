import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizacionPage } from './fertilizacion.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizacionPageRoutingModule {}
