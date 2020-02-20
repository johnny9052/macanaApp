import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotreroDetailPageRoutingModule } from './potrero-detail-routing.module';

import { PotreroDetailPage } from './potrero-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotreroDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PotreroDetailPage]
})
export class PotreroDetailPageModule {}
