import { Component, OnInit } from '@angular/core';
import { ModelClimatologico } from '../../interfaces/climatologicoInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { ClimatologicoService } from 'src/app/services/climatologico.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-estado-climatologico-detail',
  templateUrl: './estado-climatologico-detail.page.html',
  styleUrls: ['./estado-climatologico-detail.page.scss'],
})
export class EstadoClimatologicoDetailPage implements OnInit {
/*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
codeUser = '';

/****************OBJETOS************************** */
climatologicoData = {} as ModelClimatologico;
/****************END OBJETOS************************** */


  /*Almacena la configuracion del calendar*/
  customPickerOptions;

/********************INYECCION DE DEPENDENCIAS********* */
/*HelperService: Servicio generico para funcionalidades ya implementadas
ProfileService: Servicio para el consumo de web services del perfil
AlertController: Permite mostrar alerts emergentes en pantalla */
constructor(private blockAccess: BlockAccessService,
            public helperService: HelperService,
            public climatologicoService: ClimatologicoService,
            public alertCtrl: AlertController,
            private route: ActivatedRoute,
            private router: Router,
            private translate: TranslateService
) {

  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {

      this.climatologicoData.id = this.router.getCurrentNavigation().extras.state.id;
      this.climatologicoData.fecha = this.router.getCurrentNavigation().extras.state.fecha;
      this.climatologicoData.nubosidad = this.router.getCurrentNavigation().extras.state.nubosidad;
      this.climatologicoData.pluviometria = this.router.getCurrentNavigation().extras.state.pluviometria;
      this.climatologicoData.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;

    }
  });

 }

ngOnInit() {
  // Se obtiene el identidicador del usuario que ingreso al sistema
  this.getProfilePk();

      // Se configura el calendar
      this.customPickerOptions = {
        buttons: [
          {
            text: this.translate.instant("seleccionar"),
            handler: evento => {
              this.climatologicoData.fecha =
                evento.year.value +
                "-" +
                evento.month.value +
                "-" +
                evento.day.value;
            }
          },
          {
            text: this.translate.instant("cancelar"),
            handler: evento => {
              // console.log('close');
            }
          }
        ]
      };
}

/*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
getProfilePk() {
  // Se obtiene el identificador del usuario que ingreso al sistema
  this.helperService.getLocalData('profilePk').then(response => {
    this.codeUser = response;
  });
}



    /*Funcion que se encarga de almacenar la informacion del rol*/
    saveClimatologicoData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.climatologicoData.id);
      postDataObj.append('fecha' , this.climatologicoData.fecha);
      postDataObj.append('nubosidad' , this.climatologicoData.nubosidad);
      postDataObj.append('pluviometria' , this.climatologicoData.pluviometria);
      postDataObj.append('observaciones' , this.helperService.fixNotRequiredValue(this.climatologicoData.observaciones));
      postDataObj.append('idresponsable' , this.codeUser);


      if ( this.helperService.isValidValue(this.climatologicoData.id)) {
        postDataObj.append('action' , 'update');
      } else {
        postDataObj.append('action' , 'save');
      }
  
      this.climatologicoService.saveClimatologicoDataService(postDataObj);
    }


     /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteClimatologicoData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.climatologicoData.id);
    postDataObj.append('action' , 'delete');

    this.climatologicoService.deleteClimatologicoDataService(postDataObj);
  }

}
