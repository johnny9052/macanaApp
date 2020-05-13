import { Component, OnInit } from '@angular/core';
import { ModelRazaVaca } from '../../interfaces/razaVacaInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { RazaVacaService } from 'src/app/services/raza-vaca.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raza-vaca-detail',
  templateUrl: './raza-vaca-detail.page.html',
  styleUrls: ['./raza-vaca-detail.page.scss'],
})
export class RazaVacaDetailPage implements OnInit {

    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    codeUser = '';

    /****************OBJETOS************************** */
    razaVacaData = {} as ModelRazaVaca;
    /****************END OBJETOS************************** */

    /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    rolService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
    constructor(private blockAccess: BlockAccessService,
                public helperService: HelperService,
                public razaVacaService: RazaVacaService,
                public alertCtrl: AlertController,
                private route: ActivatedRoute,
                private router: Router
) {

  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {

      this.razaVacaData.id = this.router.getCurrentNavigation().extras.state.id;
      this.razaVacaData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
      this.razaVacaData.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;
    }
  });

}

ngOnInit() {
  // Se obtiene el identidicador del usuario que ingreso al sistema
  this.getProfilePk();
}

/*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
getProfilePk() {
  // Se obtiene el identificador del usuario que ingreso al sistema
  this.helperService.getLocalData('profilePk').then(response => {
    this.codeUser = response;
  });
}

  /*Funcion que se encarga de almacenar la informacion del rol*/
  saveRazaVacaData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.razaVacaData.id);
    postDataObj.append('nombre' , this.razaVacaData.nombre);
    postDataObj.append('observaciones' , this.helperService.fixNotRequiredValue(this.razaVacaData.observaciones));

    if ( this.helperService.isValidValue(this.razaVacaData.id)) {
      postDataObj.append('action' , 'update');
    } else {
      postDataObj.append('action' , 'save');
    }

    this.razaVacaService.saveRazaVacaDataService(postDataObj);
  }

    /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteRazaVacaData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.razaVacaData.id);
      postDataObj.append('action' , 'delete');

      //  this.razaVacaService.deleteRazaVacaDataService(postDataObj);
     }

}
