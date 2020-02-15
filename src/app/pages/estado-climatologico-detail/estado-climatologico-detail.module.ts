import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoClimatologicoDetailPageRoutingModule } from './estado-climatologico-detail-routing.module';

import { EstadoClimatologicoDetailPage } from './estado-climatologico-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoClimatologicoDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [EstadoClimatologicoDetailPage]
})
export class EstadoClimatologicoDetailPageModule {}
