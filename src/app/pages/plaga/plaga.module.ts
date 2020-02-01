import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlagaPageRoutingModule } from './plaga-routing.module';

import { PlagaPage } from './plaga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlagaPageRoutingModule
  ],
  declarations: [PlagaPage]
})
export class PlagaPageModule {}
