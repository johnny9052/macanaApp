import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionInsumoPageRoutingModule } from './plan-manejo-fumigacion-insumo-routing.module';

import { PlanManejoFumigacionInsumoPage } from './plan-manejo-fumigacion-insumo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionInsumoPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFumigacionInsumoPage]
})
export class PlanManejoFumigacionInsumoPageModule {}
