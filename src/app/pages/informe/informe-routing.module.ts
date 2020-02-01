import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformePage } from './informe.page';

const routes: Routes = [
  {
    path: '',
    component: InformePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformePageRoutingModule {}
