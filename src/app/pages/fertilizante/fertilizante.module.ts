import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FertilizantePageRoutingModule } from './fertilizante-routing.module';

import { FertilizantePage } from './fertilizante.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FertilizantePageRoutingModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [FertilizantePage]
})
export class FertilizantePageModule {}
