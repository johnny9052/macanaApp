import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*Import de los diferentes componentes creados*/
import { MenuComponent } from './menu/menu.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
import { HeaderComponent } from './header/header.component';
/*END Import de los diferentes componentes creados*/

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

/* Import para hacer uso del sistema de internacionalizacion */
import { TranslateModule } from '@ngx-translate/core';
/* END Import para hacer uso del sistema de internacionalizacion */


@NgModule({
  declarations: [
    MenuComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    HeaderComponent
  ],
  exports: [
    /*Todos los componentes se que exportaran a traves del modulo*/
    MenuComponent,
    HeaderLoginComponent,
    FooterLoginComponent,
    HeaderComponent
    /*END Todos los componentes se que exportaran a traves del modulo*/
 ],
  imports: [
    CommonModule,
    /*Import necesario para que reconozca las etiquetas del IONIC*/
    IonicModule,
    /*Import necesario para redireccionar*/
    RouterModule,
    /* Import necesario para la internacionalizacion */
    TranslateModule
  ]
})
export class ComponentsModule { }
