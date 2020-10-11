import { Component, OnInit } from '@angular/core';
import { ModelCronograma } from '../../interfaces/cronogramainterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { CronogramaService } from 'src/app/services/cronograma.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModelPotrero } from 'src/app/interfaces/potrerointerface';
import { PotreroService } from 'src/app/services/potrero.service';
import { CronogramaPage } from '../cronograma/cronograma.page';
import { ModelActividad } from '../../interfaces/actividadinterface';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-cronograma-datail',
  templateUrl: './cronograma-datail.page.html',
  styleUrls: ['./cronograma-datail.page.scss'],
})
export class CronogramaDatailPage implements OnInit {

   /*DATOS NECESARIOS PARA REFRESH SELECT*/
   idPotreroTempo;
   idActividadTempo;

  /*Almacena la configuracion del calendar*/
    customPickerOptions;
    customPickerOptions1;

    /*Para Select de Actividad*/
    //actividades  :  string[] = ['Fertilizar','Fumigar', 'Rotar', 'Otros'];
    itemSeleccionado;

     /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
     codeUser = '';

     /****************OBJETOS************************** */
     cronogramaData             = {} as ModelCronograma;
     potreros  :   ModelPotrero[] = [];
     actividades : ModelActividad[] = [];
     /****************END OBJETOS************************** */
     
     /*************MANEJO DEL CHECK EN ESTADO********************* */
     estado   :boolean;
     /********************INYECCION DE DEPENDENCIAS********* */
   /*HelperService: Servicio generico para funcionalidades ya implementadas
     rolService: Servicio para el consumo de web services del perfil
     AlertController: Permite mostrar alerts emergentes en pantalla */
     constructor(private  blockAccess        : BlockAccessService,
                 public   helperService      : HelperService,
                 public   cronogramaService  : CronogramaService,
                 public   potrerosService    : PotreroService,
                 public   alertCtrl          : AlertController,
                 private  route              : ActivatedRoute,
                 private  router             : Router,
                 private  translate          : TranslateService,
                 public   actividadesServices: ActividadService
 ) {
 
   this.route.queryParams.subscribe(params => {
     if (this.router.getCurrentNavigation().extras.state) {
       this.cronogramaData.id              = this.router.getCurrentNavigation().extras.state.id;
       this.idActividadTempo               = this.router.getCurrentNavigation().extras.state.idactividad;
       this.cronogramaData.fechaprogramada = this.router.getCurrentNavigation().extras.state.fechaprogramada;
       this.cronogramaData.fechaejecutada  = this.router.getCurrentNavigation().extras.state.fechaejecutada;
       this.idPotreroTempo                 = this.router.getCurrentNavigation().extras.state.idpotrero;
       this.cronogramaData.idresponsable   = this.router.getCurrentNavigation().extras.state.idresponsable;
       this.cronogramaData.ejecutado       = this.router.getCurrentNavigation().extras.state.ejecutado;
       this.cronogramaData.ejecutado       === "1" ? this.estado = true : this.estado = false;
       this.cronogramaData.numeropotrero   = this.router.getCurrentNavigation().extras.state.numeropotrero;
       this.cronogramaData.nomactividad   = this.router.getCurrentNavigation().extras.state.nomactividad;
     }
   });
 }

 ionViewWillEnter() {
  // Se obtiene los cronogramas de la base de datos para ser cargados en el select
  this.getPotrero();
  this.getActividad();
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
          this.cronogramaData.fechaprogramada =
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
  // Se configura el calendar
  this.customPickerOptions1 = {
    buttons: [
      {
        text: this.translate.instant("seleccionar"),
        handler: evento => {
          this.cronogramaData.fechaejecutada =
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
 
   /*Funcion que se encarga de almacenar la informacion del cronograma*/
   saveCronogramaData() {
     // tslint:disable-next-line: prefer-const
     let postDataObj = new FormData();
     postDataObj.append('id' ,            this.cronogramaData.id);
     postDataObj.append('idactividad' ,   this.cronogramaData.idactividad);
     postDataObj.append('fechaProgramada',this.cronogramaData.fechaprogramada);
     postDataObj.append('idPotrero' ,     this.cronogramaData.idpotrero);
     postDataObj.append('idResponsable' , this.codeUser);
     postDataObj.append('ejecutado' ,     this.estado?"1":"0");

     this.estado?
     postDataObj.append('fechaEjecutada' ,this.cronogramaData.fechaejecutada):
     postDataObj.append('fechaEjecutada' ,"");
 
     if ( this.helperService.isValidValue(this.cronogramaData.id)) {
       postDataObj.append('action' , 'update');
     } else {
       postDataObj.append('action' , 'save');
     }
     this.cronogramaService.saveCronogramaDataService(postDataObj);
   }
 
     /*Funcion que se encarga de almacenar la informacion del rol*/
   deleteCronogramaData() {
       // tslint:disable-next-line: prefer-const
       let postDataObj = new FormData();
       postDataObj.append('id' , this.cronogramaData.id);
       postDataObj.append('action' , 'delete');
 
       this.cronogramaService.deleteCronogramaDataService(postDataObj);
      //  this.tabsPage.cambioLista('0');
     } 

     getPotrero() {
      // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
      this.potrerosService.getPotrero().subscribe(
        data => {
          let res: any;
          res = data;
          this.potreros = JSON.parse(res.data);
          // this.helperService.ocultarBarraCarga();
          this.cronogramaData.idpotrero = this.idPotreroTempo;
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
    getActividad(){
       // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
       this.actividadesServices.getActividad().subscribe(
        data => {
          let res: any;
          res = data;
          this.actividades = JSON.parse(res.data);
          // this.helperService.ocultarBarraCarga();
          this.cronogramaData.idactividad = this.idActividadTempo;
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
    estadoCheck(){
    }
}
