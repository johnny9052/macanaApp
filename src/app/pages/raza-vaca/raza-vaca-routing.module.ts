import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RazaVacaPage } from './raza-vaca.page';

const routes: Routes = [
  {
    path: '',
    component: RazaVacaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RazaVacaPageRoutingModule {}
