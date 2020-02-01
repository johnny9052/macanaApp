import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AforosPageRoutingModule } from './aforos-routing.module';

import { AforosPage } from './aforos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AforosPageRoutingModule
  ],
  declarations: [AforosPage]
})
export class AforosPageModule {}
