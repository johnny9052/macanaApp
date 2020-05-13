import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RazaVacaPageRoutingModule } from './raza-vaca-routing.module';

import { RazaVacaPage } from './raza-vaca.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RazaVacaPageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [RazaVacaPage]
})
export class RazaVacaPageModule {}
