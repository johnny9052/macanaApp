import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacasDetailPageRoutingModule } from './vacas-detail-routing.module';

import { VacasDetailPage } from './vacas-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacasDetailPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [VacasDetailPage]
})
export class VacasDetailPageModule {}
