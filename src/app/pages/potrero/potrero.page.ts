import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelPotrero } from '../../interfaces/potrerointerface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PotreroService } from 'src/app/services/potrero.service';

@Component({
  selector: 'app-potrero',
  templateUrl: './potrero.page.html',
  styleUrls: ['./potrero.page.scss'],
})
export class PotreroPage implements OnInit {

  /* Se obtiene la url global definida en el archivo environment*/
  baseUrl = environment.baseUrl;

  /*Se define una lista de objetos de tipo Rol*/
  potreros: ModelPotrero[] = [];

  /*Variable para almacenar el id del usuario que se ha logueado para poder utilizarlo
  en procesos de auditoria*/
  codeUser = '';
  /*Variable que almacena el idioma seleccionado del dispositivo, para poder ser utilizado en procesos
  de internacionalizacion*/
  language = '';

  constructor(
    private blockAccess: BlockAccessService,
    private potreroService: PotreroService,
    public helperService: HelperService,
    private router: Router,
    private translate: TranslateService
  ) {}

  /*Metodo que se ejecuta cuando se carga por primera vez el formulario*/
  ngOnInit() {}

  /*Metodo que se ejecuta cuando se carga el formulario*/
  ionViewWillEnter() {
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
      this.getPotreroData();
    });
  }


   /* Metodo que se encarga de listar todos los roles del sistema */
  getPotreroData() {
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.potreroService.getPotrero().subscribe(data => {
      let res: any;
      res = data;
      /*Se convierte en un objeto JSON el listado de datos obtenido*/
      this.potreros = JSON.parse(res.data);
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
    this.potreroService.getPotrero().subscribe(data => {
      let res: any;
      res = data;
      this.potreros = JSON.parse(res.data);
      /*Esta linea oculta la barra de carga caracteristica del refresco*/
      event.target.complete();
    },
    error => {
      event.target.complete();
      this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
    });
  }

  /*Metodo que envia los datos de un potrero seleccionado en particular a otro formulario,
  encapsulando los datos en un NavigationExtras*/
  viewPotrero(id: string, numero: string, area: string, observacion: string, idrotacion: string, estado: boolean, ordenrotacion: string) {
    /*Se encapsulan los datos en el extra, definiendo un objeto llamado state y su
    variable lo llamamos data*/
     const data: NavigationExtras = {
      state: {
        id,
        numero,
        area,
        observacion,
        idrotacion,
        estado,
        ordenrotacion
      }
    };

     /*Se redirecciona al formulario roles-detail, enviando los datos encapsulados en el extra*/
     this.router.navigate(['potrero-detail'], data);
  }

}
