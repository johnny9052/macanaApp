import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlagaPage } from './plaga.page';

const routes: Routes = [
  {
    path: '',
    component: PlagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlagaPageRoutingModule {}
