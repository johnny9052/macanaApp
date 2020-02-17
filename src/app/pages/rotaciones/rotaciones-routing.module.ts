import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotacionesPage } from './rotaciones.page';

const routes: Routes = [
  {
    path: '',
    component: RotacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotacionesPageRoutingModule {}
