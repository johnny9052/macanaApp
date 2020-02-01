import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformePageRoutingModule } from './informe-routing.module';

import { InformePage } from './informe.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformePageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [InformePage]
})
export class InformePageModule {}
