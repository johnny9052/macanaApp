import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FertilizantePage } from './fertilizante.page';

const routes: Routes = [
  {
    path: '',
    component: FertilizantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FertilizantePageRoutingModule {}
