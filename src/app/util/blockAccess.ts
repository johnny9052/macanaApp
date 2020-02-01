import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HelperService } from './HelperService';

@Injectable({
  providedIn: 'root'
})
export class BlockAccessService {
  /*Dependencias del servicio
  alertCtrl: Depedencia para los modales
  loadingCtrl: Dependencia para las barras de carga,
  Storage: Almacenamiento local*/
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private helperService: HelperService
  ) {

    // console.log('***********VAMOS A VALIDAR****************');

    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {

      // console.log('******************LLEGO******************' + response);

      if (!this.helperService.isValidValue(response)) {
          this.helperService.redireccionar('/log-in');
      }
    });
  }
}
