import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelPlanManejoFumigacion } from 'src/app/interfaces/planManejoFumigacionInterface';
import { ModelPotrero } from 'src/app/interfaces/potrerointerface';
import { ModelPlanManejoFumigacionPotrero } from 'src/app/interfaces/planManejoFumigacionPotreroInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PotreroService } from 'src/app/services/potrero.service';
import { ModelPlanManejoFumigacionInsumoFumigacion } from 'src/app/interfaces/ModelPlanManejoFumigacionInsumoFumigacion';
import { PlanManejoFumigacionService } from 'src/app/services/plan-manejo-fumigacion.service';

@Component({
  selector: 'app-plan-manejo-fumigacion-operario',
  templateUrl: './plan-manejo-fumigacion-operario.page.html',
  styleUrls: ['./plan-manejo-fumigacion-operario.page.scss'],
})
export class PlanManejoFumigacionOperarioPage implements OnInit {
/* Se obtiene la url global definida en el archivo environment*/
baseUrl = environment.baseUrl;

/*Se define una lista de objetos de tipo PlanManejo*/
planesManejo: ModelPlanManejoFumigacion[] = [];
potreros: ModelPotrero[] = [];

planPotrero = {} as ModelPlanManejoFumigacionPotrero;

insumosfumigacion: ModelPlanManejoFumigacionInsumoFumigacion[] = [];

areaPotrero: number;

tiempoEspera = 1000;

/*Variable para almacenar el id del usuario que se ha logueado para poder utilizarlo
en procesos de auditoria*/
codeUser = "";
/*Variable que almacena el idioma seleccionado del dispositivo, para poder ser utilizado en procesos
de internacionalizacion*/
language = "";

/*Dependencias del servicio
BlockAccess: Dependencia que evita el acceso no autorizado de usuarios no logueados
PlanManejoesService: Servicio de los planesManejo, donde se definen los metodos que se consumen webService
HelperService: Clase utilitaria,
Router: Dependencia para poder redireccionar de un formulario a otro
TranslateService: Servicio para internacionalizacion*/
constructor(
  private blockAccess: BlockAccessService,
  private planManejoFumigacionService: PlanManejoFumigacionService,
  public helperService: HelperService,
  private router: Router,
  private translate: TranslateService,
  public potrerosService: PotreroService
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
  this.helperService.getLocalData("profilePk").then((response) => {
    this.codeUser = response;
    /*Se carga el leguaje seleccionado*/
    this.getLanguage();
  });
}

getLanguage() {
  // Se obtiene el idioma seleccionado
  this.helperService.getLocalData("language").then((response) => {
    this.language = response;
    /*Se llama el metodo que enlista todos los planesManejo*/
    this.getPlanManejoFumigacionData();
  });
}

/* Metodo que se encarga de listar todos los planesManejo del sistema */
getPlanManejoFumigacionData() {
  /*Se muestra una barra de carga*/
  this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
  /*Se llama al metodo de listar planesManejo definido en el servicio*/
  this.planManejoFumigacionService.getPlanManejoFumigacion().subscribe(
    (data) => {
      let res: any;
      res = data;
      /*Se convierte en un objeto JSON el listado de datos obtenido*/
      this.planesManejo = JSON.parse(res.data);
      /*Se oculta la barra de carga*/
      this.helperService.ocultarBarraCarga();
    },
    (error) => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(
        this.translate.instant("errorTitulo"),
        this.translate.instant("errorCargandoInformacion")
      );
    }
  );
}

getPotrero(idPlanManejo: string) {
  this.planPotrero.idpotrero = "";

  this.planManejoFumigacionService
    .getPotreroByPlanManejo(idPlanManejo)
    .subscribe(
      (data) => {
        let res: any;
        res = data;
        this.potreros = JSON.parse(res.data);

        /*Se limpia el id del potrero para que visualmente se oculte la informacion a diligenciar*/
      },
      (error) => {
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
      }
    );
}

getListInsumoFumigacionData() {
  // Se obtiene toda la informacion del usuario que entro al sistema
  this.planManejoFumigacionService
    .getListInsumoFumigacionPlanMenejoFumigacion(
      this.planPotrero.idplanfumigacion
    )
    .subscribe(
      (data) => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacio
        this.insumosfumigacion = JSON.parse(res.data);

        this.actualizarTamanio();
      },
      (error) => {
        // console.log('oops', error);
      }
    );
}

actualizarTamanio() {
  for (let objPotrero of this.potreros) {
    if (objPotrero.id === this.planPotrero.idpotrero) {
      this.areaPotrero = parseInt(objPotrero.area);
      break;
    }
  }

  for (let objInsumoFumigacion of this.insumosfumigacion) {
    objInsumoFumigacion.cantidad = (
      parseInt(objInsumoFumigacion.cantidad) * this.areaPotrero
    ).toString();
  }
}

guardarEjecucionPlanInsumoFumigacionPotrero() {
  this.planPotrero.fecha = this.helperService.fechaActual();
  this.planPotrero.ejecutado = true;

  // tslint:disable-next-line: prefer-const
  let postDataObj = new FormData();
  postDataObj.append(
    "idplanfumigacion",
    this.planPotrero.idplanfumigacion
  );
  postDataObj.append("idpotrero", this.planPotrero.idpotrero);
  postDataObj.append("fecha", this.planPotrero.fecha);
  postDataObj.append(
    "observaciones",
    this.helperService.fixNotRequiredValue(this.planPotrero.observaciones)
  );
  postDataObj.append("ejecutado", this.planPotrero.ejecutado ? "1" : "0");
  postDataObj.append("idresponsable", this.codeUser);

  postDataObj.append("action", "potreroEjecutadoPorOperario");

  this.planManejoFumigacionService
    .savePlanManejoFumigacionPotreroOperarioDataService(postDataObj)
    .then((response) => {
      setTimeout(() => {
        this.planPotrero.observaciones = "";
        this.getPotrero(this.planPotrero.idplanfumigacion);
      }, this.tiempoEspera);
    });
}
}
