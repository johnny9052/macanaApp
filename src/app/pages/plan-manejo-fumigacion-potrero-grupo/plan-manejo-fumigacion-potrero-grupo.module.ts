import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroGrupoPageRoutingModule } from './plan-manejo-fumigacion-potrero-grupo-routing.module';

import { PlanManejoFumigacionPotreroGrupoPage } from './plan-manejo-fumigacion-potrero-grupo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionPotreroGrupoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFumigacionPotreroGrupoPage]
})
export class PlanManejoFumigacionPotreroGrupoPageModule {}
