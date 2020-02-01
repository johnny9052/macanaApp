import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisisPage } from './analisis.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisisPageRoutingModule {}
