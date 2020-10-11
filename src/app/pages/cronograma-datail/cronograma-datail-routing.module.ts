import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronogramaDatailPage } from './cronograma-datail.page';

const routes: Routes = [
  {
    path: '',
    component: CronogramaDatailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronogramaDatailPageRoutingModule {}
