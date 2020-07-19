import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroGrupoPageRoutingModule } from './plan-manejo-fumigacion-potrero-grupo-routing.module';

import { PlanManejoFumigacionPotreroGrupoPage } from './plan-manejo-fumigacion-potrero-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionPotreroGrupoPageRoutingModule
  ],
  declarations: [PlanManejoFumigacionPotreroGrupoPage]
})
export class PlanManejoFumigacionPotreroGrupoPageModule {}
