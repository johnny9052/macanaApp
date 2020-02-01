import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PluviosidadPageRoutingModule } from './pluviosidad-routing.module';

import { PluviosidadPage } from './pluviosidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PluviosidadPageRoutingModule
  ],
  declarations: [PluviosidadPage]
})
export class PluviosidadPageModule {}
