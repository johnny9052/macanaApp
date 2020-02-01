import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import { ComponentsModule } from '../../components/components.module';


/*Necesario para las opciones de la parte superior del idioma tipo popover*/
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogInPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [LogInPage]
})
export class LogInPageModule {}
