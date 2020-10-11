import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanManejoFumigacionDetailPage } from './plan-manejo-fumigacion-detail.page';

/*IMPORTACIONES PARA CARGAR EL MODAL*/
import { PlanManejoFumigacionPotreroPage } from '../plan-manejo-fumigacion-potrero/plan-manejo-fumigacion-potrero.page';
import { PlanManejoFumigacionInsumoPage } from '../plan-manejo-fumigacion-insumo/plan-manejo-fumigacion-insumo.page';
import { PlanManejoFumigacionPotreroGrupoPage } from '../plan-manejo-fumigacion-potrero-grupo/plan-manejo-fumigacion-potrero-grupo.page';
import { PlanManejoFumigacionPotreroPageModule } from '../plan-manejo-fumigacion-potrero/plan-manejo-fumigacion-potrero.module';
import { PlanManejoFumigacionInsumoPageModule } from '../plan-manejo-fumigacion-insumo/plan-manejo-fumigacion-insumo.module';
import { PlanManejoFumigacionPotreroGrupoPageModule } from '../plan-manejo-fumigacion-potrero-grupo/plan-manejo-fumigacion-potrero-grupo.module';

const routes: Routes = [
  {
    path: '',
    component: PlanManejoFumigacionDetailPage
  }
];

@NgModule({
  /*Recordar hacer esta asociacion, apuntanto a la pagina que se quiere cargar como modal*/
  entryComponents: [
    PlanManejoFumigacionPotreroPage,
    PlanManejoFumigacionInsumoPage,
    PlanManejoFumigacionPotreroGrupoPage
  ],
  imports: [
    RouterModule.forChild(routes),
    /*Se importa como modulo, el modulo de la pagina que se quiere cargar (OJOOOO ES EL MODULO)*/
    PlanManejoFumigacionPotreroPageModule,
    PlanManejoFumigacionInsumoPageModule,
    PlanManejoFumigacionPotreroGrupoPageModule
  ],
  exports: [RouterModule],
})
export class PlanManejoFumigacionDetailPageRoutingModule {}
