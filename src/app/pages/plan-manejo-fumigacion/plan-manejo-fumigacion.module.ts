import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPageRoutingModule } from './plan-manejo-fumigacion-routing.module';

import { PlanManejoFumigacionPage } from './plan-manejo-fumigacion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFumigacionPage]
})
export class PlanManejoFumigacionPageModule {}
