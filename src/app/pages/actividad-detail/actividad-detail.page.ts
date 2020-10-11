import { Component, OnInit } from '@angular/core';
import { ModelActividad } from 'src/app/interfaces/actividadinterface';
import { ActividadService } from '../../services/actividad.service';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-actividad-detail',
  templateUrl: './actividad-detail.page.html',
  styleUrls: ['./actividad-detail.page.scss'],
})
export class ActividadDetailPage implements OnInit {

  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = '';
 
  /****************OBJETOS************************** */
  actividadData = {} as ModelActividad;
  /****************END OBJETOS************************** */
 
  /********************INYECCION DE DEPENDENCIAS********* */
 /*HelperService: Servicio generico para funcionalidades ya implementadas
  rolService: Servicio para el consumo de web services del perfil
  AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(private blockAccess:        BlockAccessService,
              public helperService:       HelperService,
              public actividadService:    ActividadService,
              public alertCtrl:           AlertController,
              private route:              ActivatedRoute,
              private router:             Router,
              private translate:          TranslateService
 ) {
 
 this.route.queryParams.subscribe(params => {
  if (this.router.getCurrentNavigation().extras.state) {
    this.actividadData.id          = this.router.getCurrentNavigation().extras.state.id;
    this.actividadData.nombre      = this.router.getCurrentNavigation().extras.state.nombre;
    this.actividadData.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;
  }
 });

 }
 
 ionViewWillEnter() {
 
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
 saveActividadData() {
   //console.log(this.actividadData.descripcion);
  // tslint:disable-next-line: prefer-const
  let postDataObj = new FormData();
  postDataObj.append('id' , this.actividadData.id);
  postDataObj.append('nombre' , this.actividadData.nombre);
  postDataObj.append('descripcion' , this.actividadData.descripcion);
 
  /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
     sino es porque se va a guardar*/
  if ( this.helperService.isValidValue(this.actividadData.id)) {
    postDataObj.append('action' , 'update');
  } else {
    postDataObj.append('action' , 'save');
  }
 /*Se llama al metodo del servicio que se encarga de consumir el webService*/
  this.actividadService.saveActividadDataService(postDataObj);
 }
 
  /*Funcion que se encarga de almacenar la informacion del rol*/
 deleteActividadData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.actividadData.id);
    postDataObj.append('action' , 'delete');
 
    this.actividadService.deleteActividadDataService(postDataObj);
  }
 }
 