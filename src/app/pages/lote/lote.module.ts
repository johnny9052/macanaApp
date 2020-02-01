import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotePageRoutingModule } from './lote-routing.module';

import { LotePage } from './lote.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotePageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [LotePage]
})
export class LotePageModule {}
