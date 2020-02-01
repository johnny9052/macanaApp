import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlagaPageRoutingModule } from './plaga-routing.module';

import { PlagaPage } from './plaga.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlagaPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [PlagaPage]
})
export class PlagaPageModule {}
