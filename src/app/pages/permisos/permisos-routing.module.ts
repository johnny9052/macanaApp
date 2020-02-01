import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermisosPage } from './permisos.page';

const routes: Routes = [
  {
    path: '',
    component: PermisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosPageRoutingModule {}
