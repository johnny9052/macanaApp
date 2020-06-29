import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CronogramaPageRoutingModule } from './cronograma-routing.module';

import { CronogramaPage } from './cronograma.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CronogramaPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CronogramaPage]
})
export class CronogramaPageModule {}
