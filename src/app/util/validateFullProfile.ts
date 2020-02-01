import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HelperService } from './HelperService';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateFullProfile {
  /*Dependencias del servicio
  alertCtrl: Depedencia para los modales
  loadingCtrl: Dependencia para las barras de carga,
  Storage: Almacenamiento local*/
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private helperService: HelperService,
    private translate: TranslateService
  ) {}

  validateDataFullProfile() {
    /*Ahora se valida que ya haya actualizado su informacion de perfil, sino se redireccional
        al formulario de actualizar datos de perfil*/
    this.helperService.getLocalData('profileUser').then(response2 => {
      // console.log('**********************************');
      // console.log(response2);
      if (response2 === '-1') {
        // tslint:disable-next-line: max-line-length
        this.helperService.showAlertRedirect(
          this.translate.instant('alerta'),
          this.translate.instant('debeActualizarPerfil'),
          '/profile-edit'
        );
      }
    });
  }
}
