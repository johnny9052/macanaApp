import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotreroPageRoutingModule } from './potrero-routing.module';

import { PotreroPage } from './potrero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotreroPageRoutingModule
  ],
  declarations: [PotreroPage]
})
export class PotreroPageModule {}
