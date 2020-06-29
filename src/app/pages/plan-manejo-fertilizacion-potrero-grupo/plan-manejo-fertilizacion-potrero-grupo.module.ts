import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionPotreroGrupoPageRoutingModule } from './plan-manejo-fertilizacion-potrero-grupo-routing.module';

import { PlanManejoFertilizacionPotreroGrupoPage } from './plan-manejo-fertilizacion-potrero-grupo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionPotreroGrupoPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFertilizacionPotreroGrupoPage]
})
export class PlanManejoFertilizacionPotreroGrupoPageModule {}
