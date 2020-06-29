import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FertilizanteService } from 'src/app/services/fertilizante.service';
import { ModelFertilizante } from 'src/app/interfaces/fertilizanteinterface';
import { ModelPresentacion } from '../../interfaces/presentacionInterface';
import { PresentacionService } from '../../services/presentacion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fetilizante-detail',
  templateUrl: './fetilizante-detail.page.html',
  styleUrls: ['./fetilizante-detail.page.scss'],
})
export class FetilizanteDetailPage implements OnInit {

 /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
 codeUser = '';

 /*DATOS NECESARIOS PARA REFRESH DE LOS SELECTS*/
 idPresentacioTemp;

 /****************OBJETOS************************** */
 fertilizanteData = {} as ModelFertilizante;
 presentaciones: ModelPresentacion[] = [];
 /****************END OBJETOS************************** */

 /********************INYECCION DE DEPENDENCIAS********* */
/*HelperService: Servicio generico para funcionalidades ya implementadas
 rolService: Servicio para el consumo de web services del perfil
 AlertController: Permite mostrar alerts emergentes en pantalla */
 constructor(private blockAccess:        BlockAccessService,
             public helperService:       HelperService,
             public fertilizanteService: FertilizanteService,
             public presentacionesService: PresentacionService,
             public alertCtrl:           AlertController,
             private route:              ActivatedRoute,
             private router:             Router,
             private translate: TranslateService
) {

this.route.queryParams.subscribe(params => {
 if (this.router.getCurrentNavigation().extras.state) {

   this.fertilizanteData.id =               this.router.getCurrentNavigation().extras.state.id;
   this.fertilizanteData.nombre =           this.router.getCurrentNavigation().extras.state.nombre;
   this.fertilizanteData.marca =            this.router.getCurrentNavigation().extras.state.marca;
   this.idPresentacioTemp =   this.router.getCurrentNavigation().extras.state.idpresentacion;
   this.fertilizanteData.idresponsable =    this.router.getCurrentNavigation().extras.state.idresponsable;
 }
});
}

ionViewWillEnter() {
  // Se obtiene los roles de la base de datos para ser cargados en el select
  this.getPresentaciones();

  /* Despues de que se llenan los selects, se espera 250 milisegundos para poder regresar los datos */
  setTimeout(() => {
    this.fertilizanteData = this.fertilizanteData;
  }, 250);

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

getPresentaciones() {

  this.presentacionesService.getPresentacion().subscribe(
    data => {
      let res: any;
      res = data;
      this.presentaciones = JSON.parse(res.data);
      this.fertilizanteData.idpresentacion = this.idPresentacioTemp;;
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(
        this.translate.instant("errorTitulo"),
        this.translate.instant("errorCargandoInformacion")
      );
    }
  );
}

/*Funcion que se encarga de almacenar la informacion del rol*/
saveFertilizanteData() {
 // tslint:disable-next-line: prefer-const
 let postDataObj = new FormData();
 postDataObj.append('id' , this.fertilizanteData.id);
 postDataObj.append('nombre' , this.fertilizanteData.nombre);
 postDataObj.append('marca' , this.fertilizanteData.marca);
 postDataObj.append('idpresentacion' , this.fertilizanteData.idpresentacion);
 postDataObj.append('idresponsable' , this.codeUser);

if ( this.helperService.isValidValue(this.fertilizanteData.idpresentacion)){
  postDataObj.append("idpresentacion",this.fertilizanteData.idpresentacion);
}else{
  this.helperService.showAlert(
    this.translate.instant("alertaTitulo"),
    this.translate.instant("verificarSeleccion")
  );
  return;
}

 /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
    sino es porque se va a guardar*/
 if ( this.helperService.isValidValue(this.fertilizanteData.id)) {
   postDataObj.append('action' , 'update');
 } else {
   postDataObj.append('action' , 'save');
 }
/*Se llama al metodo del servicio que se encarga de consumir el webService*/
 this.fertilizanteService.saveFertilizanteDataService(postDataObj);
}

 /*Funcion que se encarga de almacenar la informacion del rol*/
deleteFertilizanteData() {
   // tslint:disable-next-line: prefer-const
   let postDataObj = new FormData();
   postDataObj.append('id' , this.fertilizanteData.id);
   postDataObj.append('action' , 'delete');

   this.fertilizanteService.deleteFertilizanteDataService(postDataObj);
 }
}
