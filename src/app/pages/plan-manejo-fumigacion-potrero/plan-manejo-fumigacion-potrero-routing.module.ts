import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionPotreroPage } from './plan-manejo-fumigacion-potrero.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionPotreroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionPotreroPageRoutingModule {}
