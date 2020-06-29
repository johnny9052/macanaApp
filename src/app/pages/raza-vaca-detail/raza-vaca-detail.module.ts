import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RazaVacaDetailPageRoutingModule } from './raza-vaca-detail-routing.module';

import { RazaVacaDetailPage } from './raza-vaca-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RazaVacaDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [RazaVacaDetailPage]
})
export class RazaVacaDetailPageModule {}
