import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMacanaPageRoutingModule } from './info-macana-routing.module';

import { InfoMacanaPage } from './info-macana.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMacanaPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [InfoMacanaPage]
})
export class InfoMacanaPageModule {}
