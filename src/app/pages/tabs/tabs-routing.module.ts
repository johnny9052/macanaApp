import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'pendientes',
        loadChildren: () => import('../cronograma/cronograma.module').then(m => m.CronogramaPageModule)
      },
      {
        path: 'terminados',
        loadChildren: () => import('../cronograma/cronograma.module').then(m => m.CronogramaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/pendientes',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    redirectTo: '/tabs/pendientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
