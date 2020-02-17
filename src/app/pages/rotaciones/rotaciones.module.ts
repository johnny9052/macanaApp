import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotacionesPageRoutingModule } from './rotaciones-routing.module';

import { RotacionesPage } from './rotaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotacionesPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [RotacionesPage]
})
export class RotacionesPageModule {}
