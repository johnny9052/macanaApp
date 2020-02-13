import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';

/*Se agrega para poder utilizar los componentes reutilizables*/
import { ComponentsModule } from '../../components/components.module';
/*Necesario para las opciones de la parte superior del idioma tipo popover*/
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
    /* Se agrega este elemento para que reconozca los componentes reutilizables*/
    ComponentsModule,
    /* Se agrega este elemento para que se pueda utilizar la internacionalizacion*/
    TranslateModule
  ],
  declarations: [RolesPage]
})
export class RolesPageModule {}
