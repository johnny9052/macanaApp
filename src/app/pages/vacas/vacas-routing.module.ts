import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacasPage } from './vacas.page';

const routes: Routes = [
  {
    path: '',
    component: VacasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacasPageRoutingModule {}
