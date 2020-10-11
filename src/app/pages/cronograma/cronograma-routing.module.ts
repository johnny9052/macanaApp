import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronogramaPage } from './cronograma.page';

const routes: Routes = [
  {
    path: '',
    component: CronogramaPage,
  }, 
  {
     path: 'tabs/cronograma-datail',
     loadChildren: () => import('../cronograma-datail/cronograma-datail.module').then( m => m.CronogramaDatailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronogramaPageRoutingModule {}
