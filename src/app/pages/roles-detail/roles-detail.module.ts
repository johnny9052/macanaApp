import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesDetailPageRoutingModule } from './roles-detail-routing.module';

import { RolesDetailPage } from './roles-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [RolesDetailPage]
})
export class RolesDetailPageModule {}
