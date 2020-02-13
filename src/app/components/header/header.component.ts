import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  /*Recibe el titulo que se mostrara en la parte superior del formulario*/
  @Input() titulo: string;


  /**
   * HelperService: Servicio generico que ofrece funcionalidades adicionales
   * AlertController: Dependencia para mostrar mensajes emergentes con algun tipo de accion
   * TranslateService: Servicio para internacionalizacion
   */
  constructor(public helperService: HelperService,
              public alertCtrl: AlertController,
              private translate: TranslateService) { }

  ngOnInit() {}

 /*Funcion que desconecta a un usuario*/
 async logOut() {

    /*Se genera un mensaje emergente para confirmar si efectivamente se quiere desconectar*/
    const alert = await this.alertCtrl.create({
      header:  this.translate.instant('desconectarse'),
      message: this.translate.instant('deseaDesconectarse'),
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            /* Si selecciona el boton de cancelar, no se hace nada */
          }
        },
        {
          text: this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            /* Si confirma que se quiere desconectar, se elimina todos los datos almacenados localmente
            y que contiene la informacion del usuario que se logueo*/
            this.helperService.removeLocalData('profilePk');
            this.helperService.removeLocalData('firstName');
            this.helperService.removeLocalData('lastName');
            this.helperService.removeLocalData('image_perfil');
            /* Despues de eliminar los datos almacenados localmente, se redirecciona al inicio*/
            this.helperService.redireccionar('/');
          }
        }
      ]
    });

    /* Se muestra la ventana emergente y se espera que el usuario seleccione una determinada accion */
    await alert.present();

  }

}
