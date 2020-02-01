import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacasPageRoutingModule } from './vacas-routing.module';

import { VacasPage } from './vacas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacasPageRoutingModule
  ],
  declarations: [VacasPage]
})
export class VacasPageModule {}
