import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanDeManejoPageRoutingModule } from './plan-de-manejo-routing.module';

import { PlanDeManejoPage } from './plan-de-manejo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanDeManejoPageRoutingModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [PlanDeManejoPage]
})
export class PlanDeManejoPageModule {}
