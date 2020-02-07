import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosDetailPageRoutingModule } from './usuarios-detail-routing.module';

import { UsuariosDetailPage } from './usuarios-detail.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [UsuariosDetailPage]
})
export class UsuariosDetailPageModule {}
