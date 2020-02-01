import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AforosPage } from './aforos.page';

const routes: Routes = [
  {
    path: '',
    component: AforosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AforosPageRoutingModule {}
