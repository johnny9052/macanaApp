import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { Router, NavigationExtras } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModelPlanManejoFertilizacion } from "src/app/interfaces/planManejoFertilizacionInterface";
import { PlanManejoFertilizacionService } from "src/app/services/plan-manejo-fertilizacion.service";

@Component({
  selector: "app-plan-manejo-fertilizacion",
  templateUrl: "./plan-manejo-fertilizacion.page.html",
  styleUrls: ["./plan-manejo-fertilizacion.page.scss"],
})
export class PlanManejoFertilizacionPage implements OnInit {
  /* Se obtiene la url global definida en el archivo environment*/
  baseUrl = environment.baseUrl;

  /*Se define una lista de objetos de tipo PlanManejo*/
  planesManejo: ModelPlanManejoFertilizacion[] = [];

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
    private planManejoFertilizacionService: PlanManejoFertilizacionService,
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

  /*Metodo que se llama cuando se quiera refrescar el listado. Aunque la implementacion es muy similar
al listar planesManejo, este cambia debido a que no se muestra una barra de carga sino que se muestra la barra
caracteristica del regresco, por lo que su implementacion varia levemente*/
  refrescar(event) {
    this.planManejoFertilizacionService.getPlanManejoFertilizacion().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.planesManejo = JSON.parse(res.data);
        /*Esta linea oculta la barra de carga caracteristica del refresco*/
        event.target.complete();
      },
      (error) => {
        event.target.complete();
        this.helperService.showAlert(
          this.translate.instant("error"),
          this.translate.instant("errorCargandoInformacion")
        );
      }
    );
  }

  /*Metodo que envia los datos de un planManejo seleccionado en particular a otro formulario,
encapsulando los datos en un NavigationExtras*/
  viewPlanManejoFertilizacion(
    id: string,
    nombre: string,
    fechainicio: string,
    observaciones: string
  ) {
    /*Se encapsulan los datos en el extra, definiendo un objeto llamado state y su
  variable lo llamamos data*/
    const data: NavigationExtras = {
      state: {
        id,
        nombre,
        fechainicio,
        observaciones,
      },
    };

    /*Se redirecciona al formulario planesManejo-detail, enviando los datos encapsulados en el extra*/
    this.router.navigate(["plan-manejo-fertilizacion-detail"], data);
  }
}
