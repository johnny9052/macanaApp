import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FetilizanteDetailPageRoutingModule } from './fetilizante-detail-routing.module';

import { FetilizanteDetailPage } from './fetilizante-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FetilizanteDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [FetilizanteDetailPage]
})
export class FetilizanteDetailPageModule {}
