import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionInsumoPageRoutingModule } from './plan-manejo-fumigacion-insumo-routing.module';

import { PlanManejoFumigacionInsumoPage } from './plan-manejo-fumigacion-insumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionInsumoPageRoutingModule
  ],
  declarations: [PlanManejoFumigacionInsumoPage]
})
export class PlanManejoFumigacionInsumoPageModule {}
