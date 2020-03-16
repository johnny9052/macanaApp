import { Component, OnInit } from '@angular/core';
import { ModelPresentacion } from '../../interfaces/presentacionInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentacionService } from 'src/app/services/presentacion.service';

@Component({
  selector: 'app-presentacion-detail',
  templateUrl: './presentacion-detail.page.html',
  styleUrls: ['./presentacion-detail.page.scss'],
})
export class PresentacionDetailPage implements OnInit {
    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    codeUser = '';

    /****************OBJETOS************************** */
    presentacionData = {} as ModelPresentacion;
    /****************END OBJETOS************************** */


    /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    rolService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
    constructor(private blockAccess: BlockAccessService,
                public helperService: HelperService,
                public presentacionService: PresentacionService,
                public alertCtrl: AlertController,
                private route: ActivatedRoute,
                private router: Router
) { 
    this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
        this.presentacionData.id = this.router.getCurrentNavigation().extras.state.id;
        this.presentacionData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
        this.presentacionData.observacion = this.router.getCurrentNavigation().extras.state.observacion;
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
  savePresentacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.presentacionData.id);
    postDataObj.append('nombre' , this.presentacionData.nombre);
    postDataObj.append('observacion' , this.helperService.fixNotRequiredValue(this.presentacionData.observacion));

    if ( this.helperService.isValidValue(this.presentacionData.id)) {
      postDataObj.append('action' , 'update');
    } else {
      postDataObj.append('action' , 'save');
    }
    this.presentacionService.savePresentacionDataService(postDataObj);
  }
     /*Funcion que se encarga de almacenar la informacion del rol*/
     deletePresentacionData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.presentacionData.id);
      postDataObj.append('action' , 'delete');

      this.presentacionService.deletePresentacionDataService(postDataObj);
    }

}
