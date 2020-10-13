import { Component, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelCronograma } from '../../interfaces/cronogramainterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CronogramaService } from 'src/app/services/cronograma.service';
import { TabsPage } from '../tabs/tabs.page';
import { ModelActividad } from 'src/app/interfaces/actividadinterface';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector:     'app-cronograma',
  templateUrl:  './cronograma.page.html',
  styleUrls:    ['./cronograma.page.scss'],
})
// implements OnInit
export class CronogramaPage implements OnInit  {
 /* Se obtiene la url global definida en el archivo environment*/
 baseUrl = environment.baseUrl;

  OrdenActi: string[] = ['Fertilizar','Fumigar', 'Rotar', 'Otros'];

  // variable para clasificar las tareas pendientes de la terminadas
  estado: string = "1";

 

  /*Se define una lista de objetos de tipo Rol*/
  cronogramas:   ModelCronograma[] = [];
  actividadData: ModelActividad[] = [];

  /*Variable para almacenar el id del usuario que se ha logueado para poder utilizarlo
  en procesos de auditoria*/
  codeUser = '';
  /*Variable que almacena el idioma seleccionado del dispositivo, para poder ser utilizado en procesos
  de internacionalizacion*/
  language = '';

  /*Dependencias del servicio
  BlockAccess: Dependencia que evita el acceso no autorizado de usuarios no logueados
  RolesService: Servicio de los roles, donde se definen los metodos que se consumen webService
  HelperService: Clase utilitaria,
  Router: Dependencia para poder redireccionar de un formulario a otro
  TranslateService: Servicio para internacionalizacion*/
  constructor(
    private blockAccess:        BlockAccessService,
    private cronogramaService:  CronogramaService,
    public  helperService:      HelperService,
    private router:             Router,
    private translate:          TranslateService,
    private TabsPage:           TabsPage,
    private actividadService:   ActividadService
  ) {
    this.estado = this.TabsPage.cambioEstado;
  }

  /*Metodo que se ejecuta cuando se carga por primera vez el formulario*/
  ngOnInit() { }
  
  /*Metodo que se ejecuta cuando se carga el formulario*/
 public ionViewWillEnter() {
    // obtenemos las actividades
    this.getActividad();
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      /*Se carga el leguaje seleccionado*/
      this.getLanguage();
    });
  }

  getLanguage() {
    // Se obtiene el idioma seleccionado
    this.helperService.getLocalData('language').then(response => {
      this.language = response;
      /*Se llama el metodo que enlista todos los roles*/
      this.getCronogramaData();
    });
  }

  /* Metodo que se encarga de listar todos los roles del sistema */
  getCronogramaData() {
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.cronogramaService.getCronogramas().subscribe(data => {
      let res: any;
      res = data;
      /*Se convierte en un objeto JSON el listado de datos obtenido*/
      this.cronogramas = JSON.parse(res.data);
      /*Se oculta la barra de carga*/
      this.helperService.ocultarBarraCarga();
    },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
      }
    );
  
  }

  /*Metodo que se llama cuando se quiera refrescar el listado. Aunque la implementacion es muy similar
  al listar roles, este cambia debido a que no se muestra una barra de carga sino que se muestra la barra
  caracteristica del regresco, por lo que su implementacion varia levemente*/
  refrescar(event) {
    this.cronogramaService.getCronogramas().subscribe(data => {
      let res: any;
      res = data;
      this.cronogramas = JSON.parse(res.data);
      /*Esta linea oculta la barra de carga caracteristica del refresco*/
      event.target.complete();
    },
      error => {
        event.target.complete();
        this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
      });
  }



  /*Metodo que envia los datos de un croograma seleccionado en particular a otro formulario,
  encapsulando los datos en un NavigationExtras*/
  viewCronograma(
    id:              string, 
    idactividad:     string, 
    fechaprogramada: string, 
    fechaejecutada:  string, 
    idpotrero:       string, 
    idresponsable:   string, 
    ejecutado:       string) {
    /*Se encapsulan los datos en el extra, definiendo un objeto llamado state y su
    variable lo llamamos data*/
    const data: NavigationExtras = {
      state: {
        id,
        idactividad,
        fechaprogramada,
        fechaejecutada,
        idpotrero,
        idresponsable,
        ejecutado
      }
    };

    /*Se redirecciona al formulario cronograma-datail, enviando los datos encapsulados en el extra*/
    this.router.navigate(['cronograma-datail'], data);
  }
  getActividad() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.actividadService.getActividad().subscribe(
      data => {
        let res: any;
        res = data;
        //console.log(res);
        this.actividadData = JSON.parse(res.data);
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
}
