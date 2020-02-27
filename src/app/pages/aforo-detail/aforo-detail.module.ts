import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AforoDetailPageRoutingModule } from './aforo-detail-routing.module';

import { AforoDetailPage } from './aforo-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AforoDetailPageRoutingModule, 
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [AforoDetailPage]
})
export class AforoDetailPageModule {}
