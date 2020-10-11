import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadDetailPageRoutingModule } from './actividad-detail-routing.module';

import { ActividadDetailPage } from './actividad-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [ActividadDetailPage]
})
export class ActividadDetailPageModule {}
