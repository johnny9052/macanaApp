import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotacionesDetailPageRoutingModule } from './rotaciones-detail-routing.module';

import { RotacionesDetailPage } from './rotaciones-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotacionesDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [RotacionesDetailPage]
})
export class RotacionesDetailPageModule {}
