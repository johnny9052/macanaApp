import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPagePageRoutingModule } from './master-page-routing.module';

import { MasterPagePage } from './master-page.page';
import { ComponentsModule } from '../../components/components.module';

/*Necesario para las opciones de la parte superior del idioma tipo popover*/
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPagePageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [MasterPagePage]
})
export class MasterPagePageModule {}
