import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioClimaticoPage } from './cambio-climatico.page';

const routes: Routes = [
  {
    path: '',
    component: CambioClimaticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioClimaticoPageRoutingModule {}
