import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionFertilizantePageRoutingModule } from './plan-manejo-fertilizacion-fertilizante-routing.module';

import { PlanManejoFertilizacionFertilizantePage } from './plan-manejo-fertilizacion-fertilizante.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionFertilizantePageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFertilizacionFertilizantePage]
})
export class PlanManejoFertilizacionFertilizantePageModule {}
