import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresentacionDetailPageRoutingModule } from './presentacion-detail-routing.module';

import { PresentacionDetailPage } from './presentacion-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresentacionDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [PresentacionDetailPage]
})
export class PresentacionDetailPageModule {}
