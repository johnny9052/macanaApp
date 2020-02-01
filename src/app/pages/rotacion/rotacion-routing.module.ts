import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotacionPage } from './rotacion.page';

const routes: Routes = [
  {
    path: '',
    component: RotacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotacionPageRoutingModule {}
