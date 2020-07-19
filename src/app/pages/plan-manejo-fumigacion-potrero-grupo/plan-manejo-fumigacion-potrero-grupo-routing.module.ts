import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionPotreroGrupoPage } from './plan-manejo-fumigacion-potrero-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionPotreroGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanManejoFumigacionPotreroGrupoPageRoutingModule {}
