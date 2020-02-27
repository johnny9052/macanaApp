import { Component, OnInit } from "@angular/core";
import { ModelAforo } from "src/app/interfaces/aforoInterface";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AforoService } from "src/app/services/aforo.service";
import { ModelPotrero } from "src/app/interfaces/potrerointerface";
import { PotreroService } from "src/app/services/potrero.service";

@Component({
  selector: "app-aforo-detail",
  templateUrl: "./aforo-detail.page.html",
  styleUrls: ["./aforo-detail.page.scss"]
})
export class AforoDetailPage implements OnInit {
  /*Almacena la configuracion del calendar*/
  customPickerOptions;

  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  areaPotrero = "0";
  cantVacas = "0";

  /****************OBJETOS************************** */
  aforoData = {} as ModelAforo;
  /* Un objeto que contendra temporalmente los datos que llegan del extra, con el fin de esperar un X tiempo 
 y luego setearlos a la objData, dando tiempo a que se llenen los selects y se refresquen en pantalla*/
  aforoDataTemp = {} as ModelAforo;
  potreros: ModelPotrero[] = [];
  /****************END OBJETOS************************** */

  mjsTiempoPotrero = "";

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
   aforoService: Servicio para el consumo de web services del perfil
   AlertContaforoler: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public aforoService: AforoService,
    public potrerosService: PotreroService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.aforoDataTemp.id = this.router.getCurrentNavigation().extras.state.id;
        this.aforoDataTemp.fecha = this.router.getCurrentNavigation().extras.state.fecha;
        this.aforoDataTemp.idpotrero = this.router.getCurrentNavigation().extras.state.idpotrero;
        this.aforoDataTemp.pastoalto = this.router.getCurrentNavigation().extras.state.pastoalto;
        this.aforoDataTemp.pastobajo = this.router.getCurrentNavigation().extras.state.pastobajo;
        this.aforoDataTemp.pastomedio = this.router.getCurrentNavigation().extras.state.pastomedio;
        this.aforoDataTemp.lancealto = this.router.getCurrentNavigation().extras.state.lancealto;
        this.aforoDataTemp.lancemedio = this.router.getCurrentNavigation().extras.state.lancemedio;
        this.aforoDataTemp.lancebajo = this.router.getCurrentNavigation().extras.state.lancebajo;
        this.aforoDataTemp.cantlances = this.router.getCurrentNavigation().extras.state.cantlances;
        this.aforoDataTemp.pesopastoalto = this.router.getCurrentNavigation().extras.state.pesopastoalto;
        this.aforoDataTemp.pesopastomedio = this.router.getCurrentNavigation().extras.state.pesopastomedio;
        this.aforoDataTemp.cantpasto = this.router.getCurrentNavigation().extras.state.cantpasto;
        this.aforoDataTemp.porcentajealtro = this.router.getCurrentNavigation().extras.state.porcentajealtro;
        this.aforoDataTemp.porcentajemedio = this.router.getCurrentNavigation().extras.state.porcentajemedio;
        this.aforoDataTemp.porcentajebajo = this.router.getCurrentNavigation().extras.state.porcentajebajo;
        this.aforoDataTemp.totalmetrocuadrado = this.router.getCurrentNavigation().extras.state.totalmetrocuadrado;
        this.aforoDataTemp.cantpastopotrero = this.router.getCurrentNavigation().extras.state.cantpastopotrero;
        this.aforoDataTemp.tiempopotrero = this.router.getCurrentNavigation().extras.state.tiempopotrero;
        this.aforoDataTemp.observaciones = this.router.getCurrentNavigation().extras.state.observaciones;
        this.aforoDataTemp.idresponsable = this.router.getCurrentNavigation().extras.state.idresponsable;
        this.aforoDataTemp.numeropotrero = this.router.getCurrentNavigation().extras.state.numeropotrero;
      }
    });
  }

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getPotrero();

    /* Despues de que se llenan los selects, se espera 250 milisegundos para poder regresar los datos */
    setTimeout(() => {
      if (!this.helperService.isValidValue(this.aforoDataTemp.lancealto)) {
        this.aforoDataTemp.lancealto = "0";
      }

      if (!this.helperService.isValidValue(this.aforoDataTemp.lancemedio)) {
        this.aforoDataTemp.lancemedio = "0";
      }

      if (!this.helperService.isValidValue(this.aforoDataTemp.lancebajo)) {
        this.aforoDataTemp.lancebajo = "0";
      }

      this.aforoData = this.aforoDataTemp;

      /* Se obtiene el area  del potrero seleccionado y la cantidad de 
        vacas de la rotacion del potrero*/
      this.potreros.forEach(element => {
        if (element.id === this.aforoData.idpotrero) {
          this.areaPotrero = element.area;
          this.cantVacas = element.cantvacas;
        }
      });
    }, 250);

    this.mostrarMensajeTiempoPotrero();
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
            this.aforoData.fecha =
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
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
    });
  }

  getPotrero() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.potrerosService.getPotrero().subscribe(
      data => {
        let res: any;
        res = data;
        this.potreros = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
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

  /*Funcion que se encarga de almacenar la informacion del usuario*/
  saveAforoData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();

    /*Se anexa la informacion basica del usuario*/
    postDataObj.append("id", this.aforoData.id);
    postDataObj.append("fecha", this.aforoData.fecha);
    postDataObj.append("idpotrero", this.aforoData.idpotrero);
    postDataObj.append("pastoalto", this.aforoData.pastoalto);
    postDataObj.append("pastobajo", this.aforoData.pastobajo);
    postDataObj.append("pastomedio", this.aforoData.pastomedio);
    postDataObj.append("lancealto", this.aforoData.lancealto);
    postDataObj.append("lancemedio", this.aforoData.lancemedio);
    postDataObj.append("lancebajo", this.aforoData.lancebajo);
    postDataObj.append("cantlances", this.aforoData.cantlances);
    postDataObj.append("pesopastoalto", this.aforoData.pesopastoalto);
    postDataObj.append("pesopastobajo", this.aforoData.pesopastobajo);
    postDataObj.append("pesopastomedio", this.aforoData.pesopastomedio);
    postDataObj.append("cantpasto", this.aforoData.cantpasto);
    postDataObj.append("porcentajealtro", this.aforoData.porcentajealtro);
    postDataObj.append("porcentajemedio", this.aforoData.porcentajemedio);
    postDataObj.append("porcentajebajo", this.aforoData.porcentajebajo);
    postDataObj.append("totalmetrocuadrado", this.aforoData.totalmetrocuadrado);
    postDataObj.append("cantpastopotrero", this.aforoData.cantpastopotrero);
    postDataObj.append("tiempopotrero", this.aforoData.tiempopotrero);
    postDataObj.append(
      "observaciones",
      this.helperService.fixNotRequiredValue(this.aforoData.observaciones)
    );
    postDataObj.append("idresponsable", this.codeUser);

    /*Se valida si se ha seleccionado un rol en el select, para saber si se le solicita al usuario*/
    if (this.helperService.isValidValue(this.aforoData.idpotrero)) {
      postDataObj.append("idpotrero", this.aforoData.idpotrero);
    } else {
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("verificarSeleccion")
      );
      return;
    }

    /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
   sino es porque se va a guardar*/
    if (this.helperService.isValidValue(this.aforoData.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    /*Se llama al metodo del servicio que se encarga de consumir el webService*/
    this.aforoService.saveAforoDataService(postDataObj);
  }

  /*Funcion que se encarga de almacenar la informacion del aforo*/
  deleteAforoData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.aforoData.id);
    postDataObj.append("action", "delete");

    this.aforoService.deleteAforoDataService(postDataObj);
  }

  calcularDatos() {
    if (this.helperService.isValidValue(this.aforoData.idpotrero)) {
      /* Se valida que los datos del pasto hayan sido ingresados */
      if (
        this.helperService.isValidValue(this.aforoData.pastoalto) &&
        this.helperService.isValidValue(this.aforoData.pastomedio) &&
        this.helperService.isValidValue(this.aforoData.pastobajo)
      ) {
        /* Se calculan los rangos del pasto medio */
        let promedioPasto =
          (parseFloat(this.aforoData.pastoalto) +
            parseFloat(this.aforoData.pastobajo)) /
          2;
        let rangoPastoInferior = promedioPasto * 0.9;
        let rangoPastoSuperior = promedioPasto * 1.1;
        /* Se valida el pasto medio */
        if (
          parseFloat(this.aforoData.pastomedio) >= rangoPastoInferior &&
          parseFloat(this.aforoData.pastomedio) <= rangoPastoSuperior
        ) {
          if (
            parseFloat(this.aforoData.lancealto) +
              parseFloat(this.aforoData.lancemedio) +
              parseFloat(this.aforoData.lancebajo) >=
            30
          ) {
            /* Se calculan todos los datos */
            this.aforoData.cantlances = (
              parseFloat(this.aforoData.lancealto) +
              parseFloat(this.aforoData.lancemedio) +
              parseFloat(this.aforoData.lancebajo)
            ).toString();

            this.aforoData.pesopastoalto = (
              parseFloat(this.aforoData.pastoalto) *
              parseFloat(this.aforoData.lancealto)
            ).toString();

            this.aforoData.pesopastomedio = (
              parseFloat(this.aforoData.pastomedio) *
              parseFloat(this.aforoData.lancemedio)
            ).toString();

            this.aforoData.pesopastobajo = (
              parseFloat(this.aforoData.pastobajo) *
              parseFloat(this.aforoData.lancebajo)
            ).toString();

            this.aforoData.cantpasto = (
              parseFloat(this.aforoData.pesopastoalto) +
              parseFloat(this.aforoData.pesopastomedio) +
              parseFloat(this.aforoData.pesopastobajo)
            ).toString();

            this.aforoData.porcentajealtro = (
              parseFloat(this.aforoData.lancealto) /
              parseFloat(this.aforoData.cantlances)
            ).toString();

            this.aforoData.porcentajemedio = (
              parseFloat(this.aforoData.lancemedio) /
              parseFloat(this.aforoData.cantlances)
            ).toString();

            this.aforoData.porcentajebajo = (
              parseFloat(this.aforoData.lancebajo) /
              parseFloat(this.aforoData.cantlances)
            ).toString();

            this.aforoData.totalmetrocuadrado = (
              parseFloat(this.aforoData.cantpasto) /
              parseFloat(this.aforoData.cantlances)
            ).toString();

            /* Se obtiene el area  del potrero seleccionado y la cantidad de 
        vacas de la rotacion del potrero*/
            this.potreros.forEach(element => {
              if (element.id === this.aforoData.idpotrero) {
                this.areaPotrero = element.area;
                this.cantVacas = element.cantvacas;
              }
            });

            this.aforoData.cantpastopotrero = (
              parseFloat(this.areaPotrero) /
              parseFloat(this.aforoData.totalmetrocuadrado) /
              2
            ).toString();

            this.aforoData.tiempopotrero = (
              parseFloat(this.aforoData.cantpastopotrero) /
              (parseFloat(this.cantVacas) * 55)
            ).toString();

            this.mostrarMensajeTiempoPotrero();

          } else {
            this.helperService.showAlert(
              this.translate.instant("alertaTitulo"),
              this.translate.instant("lancesInsuficientes")
            );
          }
        } else {
          this.helperService.showAlert(
            this.translate.instant("alertaTitulo"),
            this.translate.instant("pastoMedioError")
          );
        }
      } else {
        this.helperService.showAlert(
          this.translate.instant("alertaTitulo"),
          this.translate.instant("verificarDatosPasto")
        );
      }
    } else {
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("seleccionePotrero")
      );
    }
  }

  aumentarLanceAlto() {
    this.aforoData.lancealto = (
      parseInt(this.aforoData.lancealto) + 1
    ).toString();
  }

  aumentarLanceMedio() {
    this.aforoData.lancemedio = (
      parseInt(this.aforoData.lancemedio) + 1
    ).toString();
  }

  aumentarLanceBajo() {
    this.aforoData.lancebajo = (
      parseInt(this.aforoData.lancebajo) + 1
    ).toString();
  }

  disminuirLanceAlto() {
    if (parseInt(this.aforoData.lancealto) > 0) {
      this.aforoData.lancealto = (
        parseInt(this.aforoData.lancealto) - 1
      ).toString();
    }
  }

  disminuirLanceMedio() {
    if (parseInt(this.aforoData.lancemedio) > 0) {
      this.aforoData.lancemedio = (
        parseInt(this.aforoData.lancemedio) - 1
      ).toString();
    }
  }

  disminuirLanceBajo() {
    if (parseInt(this.aforoData.lancebajo) > 0) {
      this.aforoData.lancebajo = (
        parseInt(this.aforoData.lancebajo) - 1
      ).toString();
    }
  }

  mostrarMensajeTiempoPotrero() {

    if (parseFloat(this.aforoData.tiempopotrero) <= 0.75) {
      this.mjsTiempoPotrero = "Las vacas pueden estar medio dia";
    } else {
      if (parseFloat(this.aforoData.tiempopotrero) < 1.4) {
        this.mjsTiempoPotrero = "Las vacas pueden estar un dia";
      } else {
        this.mjsTiempoPotrero = "Las vacas pueden estar un dia y medio";
      }
    }
  }
}
