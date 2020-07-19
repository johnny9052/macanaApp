import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionOperarioPageRoutingModule } from './plan-manejo-fumigacion-operario-routing.module';

import { PlanManejoFumigacionOperarioPage } from './plan-manejo-fumigacion-operario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionOperarioPageRoutingModule
  ],
  declarations: [PlanManejoFumigacionOperarioPage]
})
export class PlanManejoFumigacionOperarioPageModule {}
