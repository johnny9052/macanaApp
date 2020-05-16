import { Component, OnInit } from "@angular/core";
import { ModelPlanManejoFertilizacion } from "src/app/interfaces/planManejoFertilizacionInterface";
import { PlanManejoFertilizacionService } from "src/app/services/plan-manejo-fertilizacion.service";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { AlertController, ModalController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModelPlanManejoFertilizacionPotrero } from "src/app/interfaces/planManejoFertilizacionPotreroInterface";
import { PlanManejoFertilizacionPotreroPage } from "../plan-manejo-fertilizacion-potrero/plan-manejo-fertilizacion-potrero.page";
import { ModelPlanManejoFertilizacionFertilizante } from "src/app/interfaces/ModelPlanManejoFertilizacionFertilizante";
import { PlanManejoFertilizacionFertilizantePage } from "../plan-manejo-fertilizacion-fertilizante/plan-manejo-fertilizacion-fertilizante.page";
import { PlanManejoFertilizacionPotreroGrupoPage } from "../plan-manejo-fertilizacion-potrero-grupo/plan-manejo-fertilizacion-potrero-grupo.page";

@Component({
  selector: "app-plan-manejo-fertilizacion-detail",
  templateUrl: "./plan-manejo-fertilizacion-detail.page.html",
  styleUrls: ["./plan-manejo-fertilizacion-detail.page.scss"],
})
export class PlanManejoFertilizacionDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /****************OBJETOS************************** */
  planManejoFertilizacionData = {} as ModelPlanManejoFertilizacion;

  potrero = {} as ModelPlanManejoFertilizacionPotrero;
  potreros: ModelPlanManejoFertilizacionPotrero[] = [];

  fertilizante = {} as ModelPlanManejoFertilizacionFertilizante;
  fertilizantes: ModelPlanManejoFertilizacionFertilizante[] = [];
  /****************END OBJETOS************************** */

  /*Almacena la configuracion del calendar*/
  customPickerOptionsFechaInicio;
  customPickerOptionsFechaFin;

  /*******VARIABLES DE CONTROL VISUAL****************/
  hiddenPotreros = true;
  hiddenFertilizantes = true;
  /*******END VARIABLES DE CONTROL VISUAL****************/

  /*El tiempo espera es utilizado para que, cuando se agregue un nuevo elemento como un skill o 
  similares, se de un tiempo suficiente para almacenar y poder actualizar la lista con todos los
  nuevos elementos*/
  tiempoEspera = 1500;

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    planManejoFertilizacionService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public planManejoFertilizacionService: PlanManejoFertilizacionService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.planManejoFertilizacionData.id = this.router.getCurrentNavigation().extras.state.id;
        this.planManejoFertilizacionData.periodicidad = this.router.getCurrentNavigation().extras.state.periodicidad;
        this.planManejoFertilizacionData.fechainicio = this.router.getCurrentNavigation().extras.state.fechainicio;
        this.planManejoFertilizacionData.fechafin = this.router.getCurrentNavigation().extras.state.fechafin;
        this.planManejoFertilizacionData.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;

        this.getListPotrerosData();
        this.getListFertilizanteData();
      }
    });
  }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();

    // Se configura el calendar
    this.customPickerOptionsFechaInicio = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: (evento) => {
            // console.log("mensaje desde fecha inicio");

            this.planManejoFertilizacionData.fechainicio =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          },
        },
        {
          text: this.translate.instant("cancelar"),
          handler: (evento) => {
            // console.log('close');
          },
        },
      ],
    };

    // Se configura el calendar
    this.customPickerOptionsFechaFin = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: (evento) => {
            // console.log("mensaje desde fecha fin");

            this.planManejoFertilizacionData.fechafin =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          },
        },
        {
          text: this.translate.instant("cancelar"),
          handler: (evento) => {
            // console.log('close');
          },
        },
      ],
    };
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then((response) => {
      this.codeUser = response;
    });
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  savePlanManejoFertilizacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.planManejoFertilizacionData.id);
    postDataObj.append(
      "periodicidad",
      this.planManejoFertilizacionData.periodicidad
    );
    postDataObj.append(
      "fechainicio",
      this.planManejoFertilizacionData.fechainicio
    );
    postDataObj.append(
      "fechafin",

      this.planManejoFertilizacionData.fechafin
    );
    postDataObj.append(
      "observaciones",
      this.helperService.fixNotRequiredValue(
        this.planManejoFertilizacionData.observaciones
      )
    );

    postDataObj.append("idresponsable", this.codeUser);

    if (this.helperService.isValidValue(this.planManejoFertilizacionData.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    this.planManejoFertilizacionService.savePlanManejoFertilizacionDataService(
      postDataObj
    );
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  deletePlanManejoFertilizacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.planManejoFertilizacionData.id);
    postDataObj.append("action", "delete");

    this.planManejoFertilizacionService.deletePlanManejoFertilizacionDataService(
      postDataObj
    );
  }

  /******************************************************/
  /*********FUNCIONES DE CONTROL GRAFICO ****************/
  /******************************************************/

  showHidePotreros() {
    this.hiddenPotreros = !this.hiddenPotreros;
  }

  showHideFertilizantes() {
    this.hiddenFertilizantes = !this.hiddenFertilizantes;
  }

  /******************************************************/
  /*********END FUNCIONES DE CONTROL GRAFICO ************/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS POTREROS*********/
  /******************************************************/

  getListPotrerosData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.planManejoFertilizacionService
      .getListPotrerosPlanMenejoFertilizacion(
        this.planManejoFertilizacionData.id
      )
      .subscribe(
        (data) => {
          let res: any;
          res = data;
          // console.log(res);
          // Se obtiene la informacio
          this.potreros = JSON.parse(res.data);
        },
        (error) => {
          // console.log('oops', error);
        }
      );
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async crearNuevoPotreroPlanFertilizacion() {
    const modal = await this.modalCtrl.create({
      component: PlanManejoFertilizacionPotreroPage,
      componentProps: {
        idplanmanejo: this.planManejoFertilizacionData.id,
        responsable: this.codeUser,
      },
    });

    /*Se espera a que el modal sea cerrado*/
    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    if (
      data !== "undefined" &&
      data !== undefined &&
      data !== null &&
      data !== "null"
    ) {
      this.potrero = data;

      let postDataObj = new FormData();
      postDataObj.append("id", this.potrero.id);
      postDataObj.append(
        "idplanfertilizacion",
        this.potrero.idplanfertilizacion
      );
      postDataObj.append("idpotrero", this.potrero.idpotrero);
      postDataObj.append("fecha", this.potrero.fecha);
      postDataObj.append(
        "observaciones",
        this.helperService.fixNotRequiredValue(this.potrero.observaciones)
      );
      postDataObj.append("ejecutado", this.potrero.ejecutado ? "1" : "0");
      postDataObj.append("idresponsable", this.codeUser);

      if (this.helperService.isValidValue(this.potrero.id)) {
        postDataObj.append("action", "update");
      } else {
        postDataObj.append("action", "save");
      }

      this.planManejoFertilizacionService
        .savePlanManejoFertilizacionPotreroDataService(postDataObj)
        .then((response) => {
          setTimeout(() => {
            this.getListPotrerosData();
          }, this.tiempoEspera);
        });
    }
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async editarPotreroPlanFertilizacion(
    id: string,
    idplanfertilizacion: string,
    idpotrero: string,
    fecha: string,
    observaciones: string,
    ejecutado: string,
    idresponsable: string
  ) {
    const modal = await this.modalCtrl.create({
      component: PlanManejoFertilizacionPotreroPage,
      componentProps: {
        id: id,
        idplanfertilizacion: idplanfertilizacion,
        idplanmanejo: this.planManejoFertilizacionData.id,
        idpotrero: idpotrero,
        fecha: fecha,
        observaciones: observaciones,
        ejecutado: ejecutado,
        idresponsable: idresponsable,
      },
    });

    /*Se espera a que el modal sea cerrado*/
    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    if (
      data !== "undefined" &&
      data !== undefined &&
      data !== null &&
      data !== "null"
    ) {
      this.potrero = data;

      let postDataObj = new FormData();
      postDataObj.append("id", this.potrero.id);
      postDataObj.append(
        "idplanfertilizacion",
        this.potrero.idplanfertilizacion
      );
      postDataObj.append("idpotrero", this.potrero.idpotrero);
      postDataObj.append("fecha", this.potrero.fecha);
      postDataObj.append(
        "observaciones",
        this.helperService.fixNotRequiredValue(this.potrero.observaciones)
      );
      postDataObj.append("ejecutado", this.potrero.ejecutado ? "1" : "0");
      postDataObj.append("idresponsable", this.codeUser);

      if (this.helperService.isValidValue(this.potrero.id)) {
        postDataObj.append("action", "update");
      } else {
        postDataObj.append("action", "save");
      }

      this.planManejoFertilizacionService
        .savePlanManejoFertilizacionPotreroDataService(postDataObj)
        .then((response) => {
          setTimeout(() => {
            this.getListPotrerosData();
          }, this.tiempoEspera);
        });
    }
  }

  async deletePotreroPlanFertilizacion(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header: this.translate.instant("eliminar"),
      message: this.translate.instant("deseaEliminarPotrero"),
      buttons: [
        {
          text: this.translate.instant("cancelar"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // console.log('Cancelar');
          },
        },
        {
          text: this.translate.instant("aceptar"),
          cssClass: "secondary",
          handler: async (blah) => {
            let postDataObj = new FormData();
            postDataObj.append("id", id);
            postDataObj.append("action", "delete");

            this.planManejoFertilizacionService
              .deletePlanManejoFertilizacionPotreroDataService(postDataObj)
              .then((response) => {
                setTimeout(() => {
                  this.getListPotrerosData();
                }, this.tiempoEspera);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async agregarGrupoPotrerosPlanFertilizacion() {
    const modal = await this.modalCtrl.create({
      component: PlanManejoFertilizacionPotreroGrupoPage,
      componentProps: {
        idplanmanejo: this.planManejoFertilizacionData.id,
        responsable: this.codeUser,
      },
    });

    /*Se espera a que el modal sea cerrado*/
    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    if (
      data !== "undefined" &&
      data !== undefined &&
      data !== null &&
      data !== "null"
    ) {
      let configuracionCarga = data;

      let postDataObj = new FormData();
      postDataObj.append("idplanmanejo", configuracionCarga.idplanmanejo);
      postDataObj.append("idrotacion", configuracionCarga.idrotacion);
      postDataObj.append("idresponsable", configuracionCarga.idresponsable);
      postDataObj.append("action", "asociarpotrerosrotaciones");

      this.planManejoFertilizacionService
        .savePlanManejoFertilizacionPotreroPorRotacionDataService(postDataObj)
        .then((response) => {
          setTimeout(() => {
            this.getListPotrerosData();
          }, this.tiempoEspera);
        });
    }
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS POTREROS********/
  /******************************************************/

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS FERTILIZANTES*********/
  /******************************************************/

  getListFertilizanteData() {
    // Se obtiene toda la informacion del usuario que entro al sistema
    this.planManejoFertilizacionService
      .getListFertilizantePlanMenejoFertilizacion(
        this.planManejoFertilizacionData.id
      )
      .subscribe(
        (data) => {
          let res: any;
          res = data;
          // console.log(res);
          // Se obtiene la informacio
          this.fertilizantes = JSON.parse(res.data);
        },
        (error) => {
          // console.log('oops', error);
        }
      );
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async crearNuevoFertilizantePlanFertilizacion() {
    const modal = await this.modalCtrl.create({
      component: PlanManejoFertilizacionFertilizantePage,
      componentProps: {
        idplanmanejo: this.planManejoFertilizacionData.id,
        responsable: this.codeUser,
      },
    });

    /*Se espera a que el modal sea cerrado*/
    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    if (
      data !== "undefined" &&
      data !== undefined &&
      data !== null &&
      data !== "null"
    ) {
      this.fertilizante = data;

      let postDataObj = new FormData();
      postDataObj.append("id", this.fertilizante.id);
      postDataObj.append(
        "idplanfertilizacion",
        this.fertilizante.idplanfertilizacion
      );
      postDataObj.append("idfertilizante", this.fertilizante.idfertilizante);

      postDataObj.append("cantidad", this.fertilizante.cantidad);

      postDataObj.append("idresponsable", this.codeUser);

      if (this.helperService.isValidValue(this.fertilizante.id)) {
        postDataObj.append("action", "update");
      } else {
        postDataObj.append("action", "save");
      }

      this.planManejoFertilizacionService
        .savePlanManejoFertilizacionFertilizanteDataService(postDataObj)
        .then((response) => {
          setTimeout(() => {
            this.getListFertilizanteData();
          }, this.tiempoEspera);
        });
    }
  }

  /*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
  async editarFertilizantePlanFertilizacion(
    id: string,
    idplanfertilizacion: string,
    idfertilizante: string,
    cantidad: string,
    idresponsable: string
  ) {
    const modal = await this.modalCtrl.create({
      component: PlanManejoFertilizacionFertilizantePage,
      componentProps: {
        id: id,
        idplanfertilizacion: idplanfertilizacion,
        idplanmanejo: this.planManejoFertilizacionData.id,
        idfertilizante: idfertilizante,
        cantidad: cantidad,
        idresponsable: idresponsable,
      },
    });

    /*Se espera a que el modal sea cerrado*/
    await modal.present();

    /* Con esta linea se captura los datos retornados por el modal*/
    const { data } = await modal.onDidDismiss();

    if (
      data !== "undefined" &&
      data !== undefined &&
      data !== null &&
      data !== "null"
    ) {
      this.fertilizante = data;

      let postDataObj = new FormData();
      postDataObj.append("id", this.fertilizante.id);
      postDataObj.append(
        "idplanfertilizacion",
        this.fertilizante.idplanfertilizacion
      );
      postDataObj.append("idfertilizante", this.fertilizante.idfertilizante);
      postDataObj.append("cantidad", this.fertilizante.cantidad);

      postDataObj.append("idresponsable", this.codeUser);

      if (this.helperService.isValidValue(this.fertilizante.id)) {
        postDataObj.append("action", "update");
      } else {
        postDataObj.append("action", "save");
      }

      this.planManejoFertilizacionService
        .savePlanManejoFertilizacionFertilizanteDataService(postDataObj)
        .then((response) => {
          setTimeout(() => {
            this.getListFertilizanteData();
          }, this.tiempoEspera);
        });
    }
  }

  async deleteFertilizantePlanFertilizacion(id: string) {
    // console.log(id);

    const alert = await this.alertCtrl.create({
      header: this.translate.instant("eliminar"),
      message: this.translate.instant("deseaEliminarFertilizante"),
      buttons: [
        {
          text: this.translate.instant("cancelar"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // console.log('Cancelar');
          },
        },
        {
          text: this.translate.instant("aceptar"),
          cssClass: "secondary",
          handler: async (blah) => {
            let postDataObj = new FormData();
            postDataObj.append("id", id);
            postDataObj.append("action", "delete");

            this.planManejoFertilizacionService
              .deletePlanManejoFertilizacionFertilizanteDataService(postDataObj)
              .then((response) => {
                setTimeout(() => {
                  this.getListFertilizanteData();
                }, this.tiempoEspera);
              });
          },
        },
      ],
    });

    await alert.present();
  }

  /******************************************************/
  /******END FUNCIONES DE GESTION DE LOS FERTILIZANTES***/
  /******************************************************/
}
