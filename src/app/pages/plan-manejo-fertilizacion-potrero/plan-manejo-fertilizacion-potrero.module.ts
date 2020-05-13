import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionPotreroPageRoutingModule } from './plan-manejo-fertilizacion-potrero-routing.module';

import { PlanManejoFertilizacionPotreroPage } from './plan-manejo-fertilizacion-potrero.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionPotreroPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFertilizacionPotreroPage]
})
export class PlanManejoFertilizacionPotreroPageModule {}
