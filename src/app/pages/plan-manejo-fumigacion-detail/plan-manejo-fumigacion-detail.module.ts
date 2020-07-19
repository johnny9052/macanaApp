import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionDetailPageRoutingModule } from './plan-manejo-fumigacion-detail-routing.module';

import { PlanManejoFumigacionDetailPage } from './plan-manejo-fumigacion-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFumigacionDetailPage]
})
export class PlanManejoFumigacionDetailPageModule {}
