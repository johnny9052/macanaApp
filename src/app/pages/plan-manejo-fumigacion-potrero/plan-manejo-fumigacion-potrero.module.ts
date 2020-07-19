import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroPageRoutingModule } from './plan-manejo-fumigacion-potrero-routing.module';

import { PlanManejoFumigacionPotreroPage } from './plan-manejo-fumigacion-potrero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionPotreroPageRoutingModule
  ],
  declarations: [PlanManejoFumigacionPotreroPage]
})
export class PlanManejoFumigacionPotreroPageModule {}
