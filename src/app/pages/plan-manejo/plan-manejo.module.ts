import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoPageRoutingModule } from './plan-manejo-routing.module';

import { PlanManejoPage } from './plan-manejo.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoPage]
})
export class PlanManejoPageModule {}
