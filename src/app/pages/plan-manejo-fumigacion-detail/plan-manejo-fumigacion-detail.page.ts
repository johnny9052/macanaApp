import { Component, OnInit } from '@angular/core';
import { ModelPlanManejoFumigacion } from 'src/app/interfaces/planManejoFumigacionInterface';
import { ModelPlanManejoFumigacionPotrero } from 'src/app/interfaces/planManejoFumigacionPotreroInterface';
import { ModelPlanManejoFumigacionInsumoFumigacion } from 'src/app/interfaces/ModelPlanManejoFumigacionInsumoFumigacion';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { PlanManejoFumigacionService } from 'src/app/services/plan-manejo-fumigacion.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PlanManejoFumigacionPotreroPage } from '../plan-manejo-fumigacion-potrero/plan-manejo-fumigacion-potrero.page';
import { PlanManejoFumigacionPotreroGrupoPage } from '../plan-manejo-fumigacion-potrero-grupo/plan-manejo-fumigacion-potrero-grupo.page';
import { PlanManejoFumigacionInsumoPage } from '../plan-manejo-fumigacion-insumo/plan-manejo-fumigacion-insumo.page';


@Component({
  selector: 'app-plan-manejo-fumigacion-detail',
  templateUrl: './plan-manejo-fumigacion-detail.page.html',
  styleUrls: ['./plan-manejo-fumigacion-detail.page.scss'],
})
export class PlanManejoFumigacionDetailPage implements OnInit {
/*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
codeUser = "";

/****************OBJETOS************************** */
planManejoFumigacionData = {} as ModelPlanManejoFumigacion;

potrero = {} as ModelPlanManejoFumigacionPotrero;
potreros: ModelPlanManejoFumigacionPotrero[] = [];

insumofumigacion = {} as ModelPlanManejoFumigacionInsumoFumigacion;
insumosFumigacion: ModelPlanManejoFumigacionInsumoFumigacion[] = [];
/****************END OBJETOS************************** */

/*Almacena la configuracion del calendar*/
customPickerOptionsFechaInicio;

/*******VARIABLES DE CONTROL VISUAL****************/
hiddenPotreros = true;
hiddenInsumoFumigacions = true;
/*******END VARIABLES DE CONTROL VISUAL****************/

/*El tiempo espera es utilizado para que, cuando se agregue un nuevo elemento como un skill o 
similares, se de un tiempo suficiente para almacenar y poder actualizar la lista con todos los
nuevos elementos*/
tiempoEspera = 1500;

/********************INYECCION DE DEPENDENCIAS********* */
/*HelperService: Servicio generico para funcionalidades ya implementadas
  planManejoFumigacionService: Servicio para el consumo de web services del perfil
  AlertController: Permite mostrar alerts emergentes en pantalla */
constructor(
  private blockAccess: BlockAccessService,
  public helperService: HelperService,
  public planManejoFumigacionService: PlanManejoFumigacionService,
  public alertCtrl: AlertController,
  private route: ActivatedRoute,
  private router: Router,
  private translate: TranslateService,
  private modalCtrl: ModalController
) {
  this.route.queryParams.subscribe((params) => {
    if (this.router.getCurrentNavigation().extras.state) {
      this.planManejoFumigacionData.id = this.router.getCurrentNavigation().extras.state.id;
      this.planManejoFumigacionData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
      this.planManejoFumigacionData.fechainicio = this.router.getCurrentNavigation().extras.state.fechainicio;
      this.planManejoFumigacionData.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;

      this.getListPotrerosData();
      this.getListInsumoFumigacionData();
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

          this.planManejoFumigacionData.fechainicio =
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
savePlanManejoFumigacionData() {
  // tslint:disable-next-line: prefer-const
  let postDataObj = new FormData();
  postDataObj.append("id", this.planManejoFumigacionData.id);

  postDataObj.append("nombre", this.planManejoFumigacionData.nombre);

  postDataObj.append(
    "fechainicio",
    this.planManejoFumigacionData.fechainicio
  );

  postDataObj.append(
    "observaciones",
    this.helperService.fixNotRequiredValue(
      this.planManejoFumigacionData.observaciones
    )
  );

  postDataObj.append("idresponsable", this.codeUser);

  if (this.helperService.isValidValue(this.planManejoFumigacionData.id)) {
    postDataObj.append("action", "update");
  } else {
    postDataObj.append("action", "save");
  }

  this.planManejoFumigacionService.savePlanManejoFumigacionDataService(
    postDataObj
  );
}

/*Funcion que se encarga de almacenar la informacion del rol*/
deletePlanManejoFumigacionData() {
  // tslint:disable-next-line: prefer-const
  let postDataObj = new FormData();
  postDataObj.append("id", this.planManejoFumigacionData.id);
  postDataObj.append("action", "delete");

  this.planManejoFumigacionService.deletePlanManejoFumigacionDataService(
    postDataObj
  );
}

/******************************************************/
/*********FUNCIONES DE CONTROL GRAFICO ****************/
/******************************************************/

showHidePotreros() {
  this.hiddenPotreros = !this.hiddenPotreros;
}

showHideInsumoFumigacions() {
  this.hiddenInsumoFumigacions = !this.hiddenInsumoFumigacions;
}

/******************************************************/
/*********END FUNCIONES DE CONTROL GRAFICO ************/
/******************************************************/

/******************************************************/
/*********FUNCIONES DE GESTION DE LOS POTREROS*********/
/******************************************************/

getListPotrerosData() {
  // Se obtiene toda la informacion del usuario que entro al sistema
  this.planManejoFumigacionService
    .getListPotrerosPlanMenejoFumigacion(
      this.planManejoFumigacionData.id
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
async crearNuevoPotreroPlanFumigacion() {
  const modal = await this.modalCtrl.create({
    component: PlanManejoFumigacionPotreroPage,
    componentProps: {
      idplanmanejo: this.planManejoFumigacionData.id,
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
      "idplanfumigacion",
      this.potrero.idplanfumigacion
    );
    postDataObj.append("idpotrero", this.potrero.idpotrero);
    postDataObj.append("idresponsable", this.codeUser);

    if (this.helperService.isValidValue(this.potrero.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    this.planManejoFumigacionService
      .savePlanManejoFumigacionPotreroDataService(postDataObj)
      .then((response) => {
        setTimeout(() => {
          this.getListPotrerosData();
        }, this.tiempoEspera);
      });
  }
}

/*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
async editarPotreroPlanFumigacion(
  id: string,
  idplanfumigacion: string,
  idpotrero: string,
  idresponsable: string
) {
  const modal = await this.modalCtrl.create({
    component: PlanManejoFumigacionPotreroPage,
    componentProps: {
      id: id,
      idplanfumigacion: idplanfumigacion,
      idplanmanejo: this.planManejoFumigacionData.id,
      idpotrero: idpotrero,
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
      "idplanfumigacion",
      this.potrero.idplanfumigacion
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

    this.planManejoFumigacionService
      .savePlanManejoFumigacionPotreroDataService(postDataObj)
      .then((response) => {
        setTimeout(() => {
          this.getListPotrerosData();
        }, this.tiempoEspera);
      });
  }
}

async deletePotreroPlanFumigacion(id: string) {
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

          this.planManejoFumigacionService
            .deletePlanManejoFumigacionPotreroDataService(postDataObj)
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
async agregarGrupoPotrerosPlanFumigacion() {
  const modal = await this.modalCtrl.create({
    component: PlanManejoFumigacionPotreroGrupoPage,
    componentProps: {
      idplanmanejo: this.planManejoFumigacionData.id,
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

    this.planManejoFumigacionService
      .savePlanManejoFumigacionPotreroPorRotacionDataService(postDataObj)
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

getListInsumoFumigacionData() {
  // Se obtiene toda la informacion del usuario que entro al sistema
  this.planManejoFumigacionService
    .getListInsumoFumigacionPlanMenejoFumigacion(
      this.planManejoFumigacionData.id
    )
    .subscribe(
      (data) => {
        let res: any;
        res = data;
        // console.log(res);
        // Se obtiene la informacio
        this.insumosFumigacion = JSON.parse(res.data);
      },
      (error) => {
        // console.log('oops', error);
      }
    );
}

/*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
async crearNuevoInsumoFumigacionPlanFumigacion() {
  const modal = await this.modalCtrl.create({
    component: PlanManejoFumigacionInsumoPage,
    componentProps: {
      idplanmanejo: this.planManejoFumigacionData.id,
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
    this.insumofumigacion = data;

    let postDataObj = new FormData();
    postDataObj.append("id", this.insumofumigacion.id);
    postDataObj.append(
      "idplanfumigacion",
      this.insumofumigacion.idplanfumigacion
    );
    postDataObj.append("idinsumofumigacion", this.insumofumigacion.idinsumofumigacion);

    postDataObj.append("cantidad", this.insumofumigacion.cantidad);

    postDataObj.append("idresponsable", this.codeUser);

    if (this.helperService.isValidValue(this.insumofumigacion.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    this.planManejoFumigacionService
      .savePlanManejoFumigacionInsumoFumigacionDataService(postDataObj)
      .then((response) => {
        setTimeout(() => {
          this.getListInsumoFumigacionData();
        }, this.tiempoEspera);
      });
  }
}

/*Se hacer la referencia al Modal-Info-Page que es la pagina que se quiere cargar*/
async editarInsumoFumigacionPlanFumigacion(
  id: string,
  idplanfumigacion: string,
  idinsumofumigacion: string,
  cantidad: string,
  idresponsable: string
) {
  const modal = await this.modalCtrl.create({
    component: PlanManejoFumigacionInsumoPage,
    componentProps: {
      id: id,
      idplanfumigacion: idplanfumigacion,
      idplanmanejo: this.planManejoFumigacionData.id,
      idinsumofumigacion: idinsumofumigacion,
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
    this.insumofumigacion = data;

    let postDataObj = new FormData();
    postDataObj.append("id", this.insumofumigacion.id);
    postDataObj.append(
      "idplanfumigacion",
      this.insumofumigacion.idplanfumigacion
    );
    postDataObj.append("idinsumofumigacion", this.insumofumigacion.idinsumofumigacion);
    postDataObj.append("cantidad", this.insumofumigacion.cantidad);

    postDataObj.append("idresponsable", this.codeUser);

    if (this.helperService.isValidValue(this.insumofumigacion.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    this.planManejoFumigacionService
      .savePlanManejoFumigacionInsumoFumigacionDataService(postDataObj)
      .then((response) => {
        setTimeout(() => {
          this.getListInsumoFumigacionData();
        }, this.tiempoEspera);
      });
  }
}

async deleteInsumoFumigacionPlanFumigacion(id: string) {
  // console.log(id);

  const alert = await this.alertCtrl.create({
    header: this.translate.instant("eliminar"),
    message: this.translate.instant("deseaEliminarInsumoFumigacion"),
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

          this.planManejoFumigacionService
            .deletePlanManejoFumigacionInsumoFumigacionDataService(postDataObj)
            .then((response) => {
              setTimeout(() => {
                this.getListInsumoFumigacionData();
              }, this.tiempoEspera);
            });
        },
      },
    ],
  });

  await alert.present();
}

fixEjecutadoNoEjecutado(status: number, fecha: string) {
  if (status == 1) {
    return "Ejecutado el " + fecha;
  } else {
    return "No ejecutado";
  }
}

/******************************************************/
/******END FUNCIONES DE GESTION DE LOS FERTILIZANTES***/
/******************************************************/
}
