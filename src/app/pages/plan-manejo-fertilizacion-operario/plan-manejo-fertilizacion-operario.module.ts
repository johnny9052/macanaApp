import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionOperarioPageRoutingModule } from './plan-manejo-fertilizacion-operario-routing.module';

import { PlanManejoFertilizacionOperarioPage } from './plan-manejo-fertilizacion-operario.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionOperarioPageRoutingModule, 
    TranslateModule, 
    ComponentsModule
  ],
  declarations: [PlanManejoFertilizacionOperarioPage]
})
export class PlanManejoFertilizacionOperarioPageModule {}
