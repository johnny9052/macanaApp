import { Component, OnInit } from '@angular/core';
import { ModelRotacion } from '../../interfaces/rotacionInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RotacionesService } from 'src/app/services/rotaciones.service';

@Component({
  selector: 'app-rotaciones-detail',
  templateUrl: './rotaciones-detail.page.html',
  styleUrls: ['./rotaciones-detail.page.scss'],
})
export class RotacionesDetailPage implements OnInit {

     /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
     codeUser = '';

     /****************OBJETOS************************** */
     rotacionData = {} as ModelRotacion;
     /****************END OBJETOS************************** */
 
 
     /********************INYECCION DE DEPENDENCIAS********* */
   /*HelperService: Servicio generico para funcionalidades ya implementadas
     rolService: Servicio para el consumo de web services del perfil
     AlertController: Permite mostrar alerts emergentes en pantalla */
     constructor(private blockAccess: BlockAccessService,
                 public helperService: HelperService,
                 private rotacionesService: RotacionesService,
                 public alertCtrl: AlertController,
                 private route: ActivatedRoute,
                 private router: Router
 ) {
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {

      this.rotacionData.id = this.router.getCurrentNavigation().extras.state.id;
      this.rotacionData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
      this.rotacionData.cantvacas = this.router.getCurrentNavigation().extras.state.cantvacas;

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
    saveRotacionData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.rotacionData.id);
      postDataObj.append('nombre' , this.rotacionData.nombre);
      postDataObj.append('cantvacas' , this.rotacionData.cantvacas);
      postDataObj.append('idresponsable' , this.rotacionData.idresponsable);

      if ( this.helperService.isValidValue(this.rotacionData.id)) {
        postDataObj.append('action' , 'update');
      } else {
        postDataObj.append('action' , 'save');
      }
  
      this.rotacionesService.saveRotacionDataService(postDataObj);
    }

        /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteRotacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.rotacionData.id);
    postDataObj.append('action' , 'delete');

    this.rotacionesService.deleteRotacionDataService(postDataObj);
  }
}
