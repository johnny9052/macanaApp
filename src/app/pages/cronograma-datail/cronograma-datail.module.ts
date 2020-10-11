import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CronogramaDatailPageRoutingModule } from './cronograma-datail-routing.module';

import { CronogramaDatailPage } from './cronograma-datail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CronogramaDatailPageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [CronogramaDatailPage]
})
export class CronogramaDatailPageModule {}
