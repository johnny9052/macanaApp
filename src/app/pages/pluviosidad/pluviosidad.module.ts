import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PluviosidadPageRoutingModule } from './pluviosidad-routing.module';

import { PluviosidadPage } from './pluviosidad.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PluviosidadPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PluviosidadPage]
})
export class PluviosidadPageModule {}
