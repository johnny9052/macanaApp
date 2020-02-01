import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizacionPageRoutingModule } from './fertilizacion-routing.module';

import { FertilizacionPage } from './fertilizacion.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizacionPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [FertilizacionPage]
})
export class FertilizacionPageModule {}
