import { Component, OnInit } from '@angular/core';
import { ModelVaca } from 'src/app/interfaces/vacaInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { VacasService } from 'src/app/services/vacas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModelRotacion } from '../../interfaces/rotacionInterface';
import { ModelSexoVaca } from 'src/app/interfaces/sexoVacaInterface';
import { ModelRazaVaca } from 'src/app/interfaces/razaVacaInterface';
import { ModelTipoAnimalVaca } from 'src/app/interfaces/tipoAnimalVacaInterface';
import { TranslateService } from '@ngx-translate/core';
import { RotacionesService } from 'src/app/services/rotaciones.service';

@Component({
  selector: 'app-vacas-detail',
  templateUrl: './vacas-detail.page.html',
  styleUrls: ['./vacas-detail.page.scss'],
})
export class VacasDetailPage implements OnInit {

    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    codeUser = '';

    /****************OBJETOS************************** */
    vacaData = {} as ModelVaca;
    rotaciones: ModelRotacion[] = [];
    sexos: ModelSexoVaca[] = [];
    razas: ModelRazaVaca[] = [];
    tiposAnimal: ModelTipoAnimalVaca[] = [];
    /****************END OBJETOS************************** */


    /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    vacaService: Servicio para el consumo de web services del perfil
    AlertContvacaler: Permite mostrar alerts emergentes en pantalla */
    constructor(private blockAccess: BlockAccessService,
                public helperService: HelperService,
                public vacaService: VacasService,
                public rotacionesService: RotacionesService,
                public alertCtrl: AlertController,
                private route: ActivatedRoute,
                private router: Router,
                private translate: TranslateService
) {

  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {

      this.vacaData.id = this.router.getCurrentNavigation().extras.state.id;
      this.vacaData.numero = this.router.getCurrentNavigation().extras.state.numero;
      this.vacaData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
      this.vacaData.idrotacion = this.router.getCurrentNavigation().extras.state.idrotacion;
      this.vacaData.sexo = this.router.getCurrentNavigation().extras.state.sexo;
      this.vacaData.raza = this.router.getCurrentNavigation().extras.state.raza;
      this.vacaData.tipoanimal = this.router.getCurrentNavigation().extras.state.tipoanimal;
      this.vacaData.edad = this.router.getCurrentNavigation().extras.state.edad;
      this.vacaData.idresponsable = this.router.getCurrentNavigation().extras.state.idresponsable;

    }
  });

}


ionViewWillEnter() {
  // Se obtiene los roles de la base de datos para ser cargados en el select
  this.getRotacion();
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





getRotacion() {
  this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
  this.rotacionesService.getRotacion().subscribe(
    data => {
      let res: any;
      res = data;
      this.rotaciones = JSON.parse(res.data);
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(
        this.translate.instant('errorTitulo'),
        this.translate.instant('errorCargandoInformacion')
      );
    }
  );
}


  /*Funcion que se encarga de almacenar la informacion del vaca*/
  saveVacaData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.vacaData.id);
    postDataObj.append('numero' , this.vacaData.numero);
    postDataObj.append('nombre' , this.vacaData.nombre);
    postDataObj.append('idrotacion' , this.vacaData.idrotacion);
    postDataObj.append('sexo' , this.vacaData.sexo);
    postDataObj.append('raza' , this.vacaData.raza);
    postDataObj.append('tipoanimal' , this.vacaData.tipoanimal);
    postDataObj.append('edad' , this.vacaData.edad);
    postDataObj.append('idresponsable' , this.vacaData.idresponsable);

    if ( this.helperService.isValidValue(this.vacaData.id)) {
      postDataObj.append('action' , 'update');
    } else {
      postDataObj.append('action' , 'save');
    }

    this.vacaService.saveVacaDataService(postDataObj);
  }


    /*Funcion que se encarga de almacenar la informacion del vaca*/
  deleteVacaData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.vacaData.id);
      postDataObj.append('action' , 'delete');

      this.vacaService.deleteVacaDataService(postDataObj);
    }

}
