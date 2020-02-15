import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoClimatologicoPageRoutingModule } from './estado-climatologico-routing.module';

import { EstadoClimatologicoPage } from './estado-climatologico.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoClimatologicoPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [EstadoClimatologicoPage]
})
export class EstadoClimatologicoPageModule {}
