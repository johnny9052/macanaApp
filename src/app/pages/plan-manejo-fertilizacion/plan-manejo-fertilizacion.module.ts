import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionPageRoutingModule } from './plan-manejo-fertilizacion-routing.module';

import { PlanManejoFertilizacionPage } from './plan-manejo-fertilizacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFertilizacionPage]
})
export class PlanManejoFertilizacionPageModule {}
