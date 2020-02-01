import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotacionPageRoutingModule } from './rotacion-routing.module';

import { RotacionPage } from './rotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotacionPageRoutingModule
  ],
  declarations: [RotacionPage]
})
export class RotacionPageModule {}
