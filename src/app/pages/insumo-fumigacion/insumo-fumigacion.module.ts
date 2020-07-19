import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumoFumigacionPageRoutingModule } from './insumo-fumigacion-routing.module';

import { InsumoFumigacionPage } from './insumo-fumigacion.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumoFumigacionPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [InsumoFumigacionPage]
})
export class InsumoFumigacionPageModule {}
