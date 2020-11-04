import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { ModelPlanManejoFertilizacion } from "src/app/interfaces/planManejoFertilizacionInterface";
import { BlockAccessService } from "src/app/util/blockAccess";
import { PlanManejoFertilizacionService } from "src/app/services/plan-manejo-fertilizacion.service";
import { HelperService } from "src/app/util/HelperService";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModelPlanManejoFertilizacionPotrero } from "src/app/interfaces/planManejoFertilizacionPotreroInterface";
import { ModelPotrero } from "src/app/interfaces/potrerointerface";
import { PotreroService } from "src/app/services/potrero.service";
import { ModelPlanManejoFertilizacionFertilizante } from "src/app/interfaces/ModelPlanManejoFertilizacionFertilizante";

@Component({
  selector: "app-plan-manejo-fertilizacion-operario",
  templateUrl: "./plan-manejo-fertilizacion-operario.page.html",
  styleUrls: ["./plan-manejo-fertilizacion-operario.page.scss"],
})
export class PlanManejoFertilizacionOperarioPage implements OnInit {
  /* Se obtiene la url global definida en el archivo environment*/
  baseUrl = environment.baseUrl;

  /*Se define una lista de objetos de tipo PlanManejo*/
  planesManejo: ModelPlanManejoFertilizacion[] = [];
  potreros: ModelPotrero[] = [];

  planPotrero = {} as ModelPlanManejoFertilizacionPotrero;

  fertilizantes: ModelPlanManejoFertilizacionFertilizante[] = [];

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
    private blockAccess                      : BlockAccessService,
    private planManejoFertilizacionService   : PlanManejoFertilizacionService,
    public  helperService                    : HelperService,
    private router                           : Router,
    private translate                        : TranslateService,
    public  potrerosService                  : PotreroService
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
      this.getPlanManejoFertilizacionData();
    });
  }

  /* Metodo que se encarga de listar todos los planesManejo del sistema */
  getPlanManejoFertilizacionData() {
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se llama al metodo de listar planesManejo definido en el servicio*/
    this.planManejoFertilizacionService.getPlanManejoFertilizacion().subscribe(
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

    this.planManejoFertilizacionService
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

  getListFertilizanteData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.planManejoFertilizacionService
      .getListFertilizantePlanMenejoFertilizacion(
        this.planPotrero.idplanfertilizacion
      )
      .subscribe(
        (data) => {
          let res: any;
          res = data;
          // Se obtiene la informacio
          this.fertilizantes = JSON.parse(res.data);

          this.actualizarTamanio();
        },
        (error) => {
          console.log('oops', error);
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

    for (let objFertilizante of this.fertilizantes) {
      objFertilizante.cantidad = (
        parseInt(objFertilizante.cantidad) * this.areaPotrero
      ).toString();
    }
  }

  guardarEjecucionPlanFertilizantePotrero() {
    this.planPotrero.fecha = this.helperService.fechaActual();
    this.planPotrero.ejecutado = true;

    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append(
      "idplanfertilizacion",
      this.planPotrero.idplanfertilizacion
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

    this.planManejoFertilizacionService
      .savePlanManejoFertilizacionPotreroOperarioDataService(postDataObj)
      .then((response) => {
        setTimeout(() => {
          this.planPotrero.observaciones = "";
          this.getPotrero(this.planPotrero.idplanfertilizacion);
        }, this.tiempoEspera);
      });
  }
}
