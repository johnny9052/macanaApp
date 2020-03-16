import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanDeManejoDetailPageRoutingModule } from './plan-de-manejo-detail-routing.module';

import { PlanDeManejoDetailPage } from './plan-de-manejo-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanDeManejoDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [PlanDeManejoDetailPage]
})
export class PlanDeManejoDetailPageModule {}
