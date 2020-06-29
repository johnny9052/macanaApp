import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronogramaPage } from './cronograma.page';

const routes: Routes = [
  {
    path: '',
    component: CronogramaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronogramaPageRoutingModule {}
