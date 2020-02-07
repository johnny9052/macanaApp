import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosDetailPage } from './usuarios-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosDetailPageRoutingModule {}
