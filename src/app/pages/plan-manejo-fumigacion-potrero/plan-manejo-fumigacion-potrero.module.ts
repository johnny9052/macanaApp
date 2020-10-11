import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroPageRoutingModule } from './plan-manejo-fumigacion-potrero-routing.module';

import { PlanManejoFumigacionPotreroPage } from './plan-manejo-fumigacion-potrero.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanManejoFumigacionPotreroPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlanManejoFumigacionPotreroPage]
})
export class PlanManejoFumigacionPotreroPageModule {}
