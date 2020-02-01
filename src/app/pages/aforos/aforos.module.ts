import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AforosPageRoutingModule } from './aforos-routing.module';

import { AforosPage } from './aforos.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AforosPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AforosPage]
})
export class AforosPageModule {}
