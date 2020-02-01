import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoPageRoutingModule } from './plan-manejo-routing.module';

import { PlanManejoPage } from './plan-manejo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoPageRoutingModule
  ],
  declarations: [PlanManejoPage]
})
export class PlanManejoPageModule {}
