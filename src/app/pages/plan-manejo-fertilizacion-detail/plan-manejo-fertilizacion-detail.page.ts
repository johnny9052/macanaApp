import { Component, OnInit } from "@angular/core";
import { ModelPlanManejoFertilizacion } from "src/app/interfaces/planManejoFertilizacionInterface";
import { PlanManejoFertilizacionService } from "src/app/services/plan-manejo-fertilizacion.service";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

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
  /****************END OBJETOS************************** */

  /*Almacena la configuracion del calendar*/
  customPickerOptionsFechaInicio;
  customPickerOptionsFechaFin;

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    rolService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public rolService: PlanManejoFertilizacionService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.planManejoFertilizacionData.id = this.router.getCurrentNavigation().extras.state.id;
        this.planManejoFertilizacionData.periodicidad = this.router.getCurrentNavigation().extras.state.periodicidad;
        this.planManejoFertilizacionData.fechainicio = this.router.getCurrentNavigation().extras.state.fechainicio;
        this.planManejoFertilizacionData.fechafin = this.router.getCurrentNavigation().extras.state.fechafin;
        this.planManejoFertilizacionData.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;
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

            console.log('mensaje desde fecha inicio');

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

            console.log('mensaje desde fecha fin');

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

    this.rolService.savePlanManejoFertilizacionDataService(postDataObj);
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  deletePlanManejoFertilizacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.planManejoFertilizacionData.id);
    postDataObj.append("action", "delete");

    this.rolService.deletePlanManejoFertilizacionDataService(postDataObj);
  }
}
