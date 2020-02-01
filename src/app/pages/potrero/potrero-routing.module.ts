import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotreroPage } from './potrero.page';

const routes: Routes = [
  {
    path: '',
    component: PotreroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotreroPageRoutingModule {}
