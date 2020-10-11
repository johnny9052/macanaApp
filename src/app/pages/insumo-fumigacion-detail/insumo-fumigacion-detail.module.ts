import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumoFumigacionDetailPageRoutingModule } from './insumo-fumigacion-detail-routing.module';

import { InsumoFumigacionDetailPage } from './insumo-fumigacion-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumoFumigacionDetailPageRoutingModule, 
    ComponentsModule,
    TranslateModule
  ],
  declarations: [InsumoFumigacionDetailPage]
})
export class InsumoFumigacionDetailPageModule {}
