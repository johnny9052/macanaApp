import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacasPageRoutingModule } from './vacas-routing.module';

import { VacasPage } from './vacas.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacasPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [VacasPage]
})
export class VacasPageModule {}
