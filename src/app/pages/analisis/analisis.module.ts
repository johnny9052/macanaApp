import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisisPageRoutingModule } from './analisis-routing.module';

import { AnalisisPage } from './analisis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisPageRoutingModule
  ],
  declarations: [AnalisisPage]
})
export class AnalisisPageModule {}
