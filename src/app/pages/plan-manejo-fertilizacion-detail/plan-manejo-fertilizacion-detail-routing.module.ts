import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PlanManejoFertilizacionDetailPage } from "./plan-manejo-fertilizacion-detail.page";

/*IMPORTACIONES PARA CARGAR EL MODAL*/
import { PlanManejoFertilizacionPotreroPage } from "../plan-manejo-fertilizacion-potrero/plan-manejo-fertilizacion-potrero.page";
import { PlanManejoFertilizacionPotreroPageModule } from "../plan-manejo-fertilizacion-potrero/plan-manejo-fertilizacion-potrero.module";

import { PlanManejoFertilizacionFertilizantePage } from "../plan-manejo-fertilizacion-fertilizante/plan-manejo-fertilizacion-fertilizante.page";
import { PlanManejoFertilizacionFertilizantePageModule } from "../plan-manejo-fertilizacion-fertilizante/plan-manejo-fertilizacion-fertilizante.module";

import { PlanManejoFertilizacionPotreroGrupoPage } from '../plan-manejo-fertilizacion-potrero-grupo/plan-manejo-fertilizacion-potrero-grupo.page';
import { PlanManejoFertilizacionPotreroGrupoPageModule } from '../plan-manejo-fertilizacion-potrero-grupo/plan-manejo-fertilizacion-potrero-grupo.module';


const routes: Routes = [
  {
    path: "",
    component: PlanManejoFertilizacionDetailPage,
  },
];

@NgModule({
  /*Recordar hacer esta asociacion, apuntanto a la pagina que se quiere cargar como modal*/
  entryComponents: [
    PlanManejoFertilizacionPotreroPage,
    PlanManejoFertilizacionFertilizantePage,
    PlanManejoFertilizacionPotreroGrupoPage
  ],
  imports: [
    RouterModule.forChild(routes),
    /*Se importa como modulo, el modulo de la pagina que se quiere cargar (OJOOOO ES EL MODULO)*/
    PlanManejoFertilizacionPotreroPageModule,
    PlanManejoFertilizacionFertilizantePageModule,
    PlanManejoFertilizacionPotreroGrupoPageModule
  ],
  exports: [RouterModule],
})
export class PlanManejoFertilizacionDetailPageRoutingModule {}
