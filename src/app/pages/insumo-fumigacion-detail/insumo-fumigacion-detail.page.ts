import { Component, OnInit } from "@angular/core";
import { ModelInsumoFumigacion } from "src/app/interfaces/insumoFumigacioninterface";
import { ModelPresentacion } from "src/app/interfaces/presentacionInterface";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { PresentacionService } from "src/app/services/presentacion.service";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { InsumoFumigacionService } from "src/app/services/insumo-fumigacion.service";

@Component({
  selector: "app-insumo-fumigacion-detail",
  templateUrl: "./insumo-fumigacion-detail.page.html",
  styleUrls: ["./insumo-fumigacion-detail.page.scss"],
})
export class InsumoFumigacionDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /*DATOS NECESARIOS PARA REFRESH DE LOS SELECTS*/
  idPresentacioTemp;

  /****************OBJETOS************************** */
  insumoFumigacionData = {} as ModelInsumoFumigacion;
  presentaciones: ModelPresentacion[] = [];
  /****************END OBJETOS************************** */

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
 rolService: Servicio para el consumo de web services del perfil
 AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public insumoFumigacionService: InsumoFumigacionService,
    public presentacionesService: PresentacionService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.insumoFumigacionData.id = this.router.getCurrentNavigation().extras.state.id;
        this.insumoFumigacionData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
        this.insumoFumigacionData.marca = this.router.getCurrentNavigation().extras.state.marca;
        this.idPresentacioTemp = this.router.getCurrentNavigation().extras.state.idpresentacion;
        this.insumoFumigacionData.idresponsable = this.router.getCurrentNavigation().extras.state.idresponsable;
      }
    });
  }

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getPresentaciones();

    /* Despues de que se llenan los selects, se espera 250 milisegundos para poder regresar los datos */
    setTimeout(() => {
      this.insumoFumigacionData = this.insumoFumigacionData;
    }, 250);
  }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then((response) => {
      this.codeUser = response;
    });
  }

  getPresentaciones() {
    this.presentacionesService.getPresentacion().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.presentaciones = JSON.parse(res.data);
        this.insumoFumigacionData.idpresentacion = this.idPresentacioTemp;
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

  /*Funcion que se encarga de almacenar la informacion del rol*/
  saveInsumoFumigacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.insumoFumigacionData.id);
    postDataObj.append("nombre", this.insumoFumigacionData.nombre);
    postDataObj.append("marca", this.insumoFumigacionData.marca);
    postDataObj.append(
      "idpresentacion",
      this.insumoFumigacionData.idpresentacion
    );
    postDataObj.append("idresponsable", this.codeUser);

    if (
      this.helperService.isValidValue(this.insumoFumigacionData.idpresentacion)
    ) {
      postDataObj.append(
        "idpresentacion",
        this.insumoFumigacionData.idpresentacion
      );
    } else {
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("verificarSeleccion")
      );
      return;
    }

    /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
    sino es porque se va a guardar*/
    if (this.helperService.isValidValue(this.insumoFumigacionData.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }
    /*Se llama al metodo del servicio que se encarga de consumir el webService*/
    this.insumoFumigacionService.saveInsumoFumigacionDataService(postDataObj);
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteInsumoFumigacionData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.insumoFumigacionData.id);
    postDataObj.append("action", "delete");

    this.insumoFumigacionService.deleteInsumoFumigacionDataService(postDataObj);
  }
}
