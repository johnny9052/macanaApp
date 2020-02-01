import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPagePageRoutingModule } from './master-page-routing.module';

import { MasterPagePage } from './master-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPagePageRoutingModule
  ],
  declarations: [MasterPagePage]
})
export class MasterPagePageModule {}
