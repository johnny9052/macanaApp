import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizacionPageRoutingModule } from './fertilizacion-routing.module';

import { FertilizacionPage } from './fertilizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizacionPageRoutingModule
  ],
  declarations: [FertilizacionPage]
})
export class FertilizacionPageModule {}
