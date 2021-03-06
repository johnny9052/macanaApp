import { Component, OnInit } from "@angular/core";
import { ModelVaca } from "src/app/interfaces/vacaInterface";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { VacasService } from "src/app/services/vacas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { ModelRotacion } from "../../interfaces/rotacionInterface";
import { ModelSexoVaca } from "src/app/interfaces/sexoVacaInterface";
import { ModelRazaVaca } from "src/app/interfaces/razaVacaInterface";
import { ModelTipoAnimalVaca } from "src/app/interfaces/tipoAnimalVacaInterface";
import { TranslateService } from "@ngx-translate/core";
import { RotacionesService } from "src/app/services/rotaciones.service";

@Component({
  selector: "app-vacas-detail",
  templateUrl: "./vacas-detail.page.html",
  styleUrls: ["./vacas-detail.page.scss"]
})
export class VacasDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /*DATOS NECESARIOS PARA REFRESH DE LOS SELECTS*/
  idRotacionTemp;
  idSexoTemp;
  idRazaTemp;
  idTipoTemp;

  /****************OBJETOS************************** */
  vacaData   = {} as ModelVaca;
  rotaciones : ModelRotacion[] = [];
  sexos      : ModelSexoVaca[] = [];
  razas      : ModelRazaVaca[] = [];
  tiposAnimal: ModelTipoAnimalVaca[] = [];
  /****************END OBJETOS************************** */

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    vacaService: Servicio para el consumo de web services del perfil
    AlertContvacaler: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public vacaService: VacasService,
    public rotacionesService: RotacionesService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        
        this.vacaData.id = this.router.getCurrentNavigation().extras.state.id;
        this.vacaData.numero = this.router.getCurrentNavigation().extras.state.numero;
        this.vacaData.nombre = this.router.getCurrentNavigation().extras.state.nombre;

        this.idRotacionTemp = this.router.getCurrentNavigation().extras.state.idrotacion;
        this.idSexoTemp = this.router.getCurrentNavigation().extras.state.sexo;
        this.idRazaTemp = this.router.getCurrentNavigation().extras.state.raza;
        this.idTipoTemp= this.router.getCurrentNavigation().extras.state.tipoanimal;

        this.vacaData.edad = this.router.getCurrentNavigation().extras.state.edad;
        this.vacaData.idresponsable = this.router.getCurrentNavigation().extras.state.idresponsable;
      }
    });
  }

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getRotaciones();
    this.getSexoVaca();
    this.getRazaVaca();
    this.getTipoVaca();

    /* Despues de que se llenan los selects, se espera 250 milisegundos para poder regresar los datos */
    setTimeout(() => {
      this.vacaData = this.vacaData;
    }, 250);

  }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
    });
  }

  getRotaciones() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rotacionesService.getRotacion().subscribe(
      data => {
        let res: any;
        res = data;
        this.rotaciones = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
        this.vacaData.idrotacion = this.idRotacionTemp;

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

  getSexoVaca() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.vacaService.getSexoVaca().subscribe(
      data => {
        let res: any;
        res = data;
        this.sexos = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
        this.vacaData.sexo = this.idSexoTemp;
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

  getRazaVaca() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.vacaService.getRazaVaca().subscribe(
      data => {
        let res: any;
        res = data;
        this.razas = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
        this.vacaData.raza = this.idRazaTemp;
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

  getTipoVaca() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.vacaService.getTipoVaca().subscribe(
      data => {
        let res: any;
        res = data;
        this.tiposAnimal = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
        this.vacaData.tipoanimal = this.idTipoTemp;
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
  saveVacaData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();

    /*Se anexa la informacion basica del usuario*/
    postDataObj.append("id", this.vacaData.id);
    postDataObj.append("numero", this.vacaData.numero);
    postDataObj.append("nombre", this.vacaData.nombre);
    postDataObj.append("idrotacion", this.vacaData.idrotacion);
    postDataObj.append("edad", this.vacaData.edad);
    postDataObj.append("idresponsable", this.codeUser);

    /*Se valida si se ha seleccionado un rol en el select, para saber si se le solicita al usuario*/
    if (
      this.helperService.isValidValue(this.vacaData.sexo) &&
      this.helperService.isValidValue(this.vacaData.raza) &&
      this.helperService.isValidValue(this.vacaData.tipoanimal)
    ) {
      postDataObj.append("sexo", this.vacaData.sexo);
      postDataObj.append("raza", this.vacaData.raza);
      postDataObj.append("tipoanimal", this.vacaData.tipoanimal);
    } else {
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("verificarSeleccion")
      );
      return;
    }

    /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
    sino es porque se va a guardar*/
    if (this.helperService.isValidValue(this.vacaData.id)) {
      postDataObj.append("action", "update");
    } else {
        postDataObj.append("action", "save");
    }

    /*Se llama al metodo del servicio que se encarga de consumir el webService*/
    this.vacaService.saveVacaDataService(postDataObj);
  }

  /*Funcion que se encarga de almacenar la informacion del vaca*/
  deleteVacaData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.vacaData.id);
    postDataObj.append("action", "delete");

    this.vacaService.deleteVacaDataService(postDataObj);
  }
}
