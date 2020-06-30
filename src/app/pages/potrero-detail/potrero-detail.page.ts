import { Component, OnInit } from "@angular/core";
import { ModelPotrero } from "../../interfaces/potrerointerface";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { PotreroService } from "src/app/services/potrero.service";
import { ModelRotacion } from "../../interfaces/rotacionInterface";
import { RotacionesService } from "../../services/rotaciones.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-potrero-detail",
  templateUrl: "./potrero-detail.page.html",
  styleUrls: ["./potrero-detail.page.scss"],
})
export class PotreroDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /*CAMPOS ORIENTADOS AL REFRESH DEL SELECT*/
  idRotacionTemp;

  /****************OBJETOS************************** */
  potreroData = {} as ModelPotrero;
  rotaciones: ModelRotacion[] = [];
  /****************END OBJETOS************************** */

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
     rolService: Servicio para el consumo de web services del perfil
     AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public potreroService: PotreroService,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    public rotacionesService: RotacionesService,
    private translate: TranslateService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.potreroData.id = this.router.getCurrentNavigation().extras.state.id;
        this.potreroData.numero = this.router.getCurrentNavigation().extras.state.numero;
        this.potreroData.area = this.router.getCurrentNavigation().extras.state.area;
        this.potreroData.observacion = this.router.getCurrentNavigation().extras.state.observacion;
        this.idRotacionTemp = this.router.getCurrentNavigation().extras.state.idrotacion;
        this.potreroData.idresponsable = this.router.getCurrentNavigation().extras.state.idresponsable;
        this.potreroData.estado = this.router.getCurrentNavigation().extras.state.estado;
        this.potreroData.ordenrotacion = this.router.getCurrentNavigation().extras.state.ordenrotacion
        console.log("El orden  es "+ this.potreroData.ordenrotacion);
      }
    });    
  }
  
  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getRotaciones();
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
  getRotaciones() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rotacionesService.getRotacion().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.rotaciones = JSON.parse(res.data);
        this.potreroData.idrotacion = this.idRotacionTemp;
        // this.helperService.ocultarBarraCarga();
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
  savePotreroData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.potreroData.id);
    postDataObj.append("numero", this.potreroData.numero);
    postDataObj.append("area", this.potreroData.area);
    postDataObj.append("observacion",this.helperService.fixNotRequiredValue(this.potreroData.observacion));
    postDataObj.append("idrotacion", this.potreroData.idrotacion);
    postDataObj.append("estado", this.potreroData.estado ? "1" : "0");
    postDataObj.append("idresponsable", this.codeUser);
    postDataObj.append("ordenrotacion", this.potreroData.ordenrotacion);

    if (this.helperService.isValidValue(this.potreroData.idrotacion)){
      postDataObj.append("idrotacion", this.potreroData.idrotacion);
    }else{
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("verificarSeleccion")
      );
      return;
    }

    if (this.helperService.isValidValue(this.potreroData.id)) {
      postDataObj.append("action", "update");
    } else {
      postDataObj.append("action", "save");
    }

    this.potreroService.savePotreroDataService(postDataObj);
  }
  /*Funcion que se encarga de almacenar la informacion del rol*/
  deletePotreroData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.potreroData.id);
    postDataObj.append("action", "delete");

    this.potreroService.deletePotreroDataService(postDataObj);
  }
}
