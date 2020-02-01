import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioClimaticoPageRoutingModule } from './cambio-climatico-routing.module';

import { CambioClimaticoPage } from './cambio-climatico.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioClimaticoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CambioClimaticoPage]
})
export class CambioClimaticoPageModule {}
