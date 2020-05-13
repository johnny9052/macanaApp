import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionDetailPageRoutingModule } from './plan-manejo-fertilizacion-detail-routing.module';

import { PlanManejoFertilizacionDetailPage } from './plan-manejo-fertilizacion-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFertilizacionDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFertilizacionDetailPage]
})
export class PlanManejoFertilizacionDetailPageModule {}
