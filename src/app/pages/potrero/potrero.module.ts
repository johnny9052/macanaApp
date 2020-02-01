import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotreroPageRoutingModule } from './potrero-routing.module';

import { PotreroPage } from './potrero.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotreroPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PotreroPage]
})
export class PotreroPageModule {}
