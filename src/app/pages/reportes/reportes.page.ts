import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { TranslateService } from "@ngx-translate/core";
import { AforoService } from 'src/app/services/aforo.service';

@Component({
  selector: "app-reportes",
  templateUrl: "./reportes.page.html",
  styleUrls: ["./reportes.page.scss"]
})
export class ReportesPage implements OnInit {
  /*Variable para almacenar el id del usuario que se ha logueado para poder utilizarlo
  en procesos de auditoria*/
  codeUser = "";
  /*Variable que almacena el idioma seleccionado del dispositivo, para poder ser utilizado en procesos
  de internacionalizacion*/
  language = "";

  /*Se inyencta la dependencia del actionSheetController y se hace
  el import en la parte superior */
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    private translate: TranslateService,
    private aforosService: AforoService,
  ) {}

  ngOnInit() {}

  /*Metodo que se ejecuta cuando se carga el formulario*/
  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
      /*Se carga el leguaje seleccionado*/
      this.getLanguage();
    });
  }

  getLanguage() {
    // Se obtiene el idioma seleccionado
    this.helperService.getLocalData("language").then(response => {
      this.language = response;
    });
  }

  /*El async lo que indica es que se retornara una promesa (es una tarea
    asincrona). El await, lo que hace es esperar a que termine la funcion.
    Esta funcion se asocia a un boton en el HTML para que muestre las opciones*/
  async desplegrarReportesAforo() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant("reporteAforos"),
      /*Con esto se evita que se cierre la ventana desde el fondo*/
      backdropDismiss: false,
      buttons: [
        {
          text: this.translate.instant("PDF"),
          /* icon: "trash", */
          /*Se define una clase personalizada, pero como el actionSheet hace 
          parte del nucleo de angular, toca definirlo en el scss global, sino
          entonces se podria definir en el css de este componente en especifico*/
          cssClass: "accionesInferior",
          /*Funcion que se ejecuta cuando se preciona el boton*/
          handler: () => {
            this.generarPDFAforos();
          }
        },
        {
          text: this.translate.instant("EXCELCOMA"),
          /* icon: "share", */
          cssClass: "accionesInferior",
          handler: () => {
            this.generarCSVAforos(',');
          }
        },
        {
          text: this.translate.instant("EXCELPUNTOCOMA"),
          /* icon: "share", */
          cssClass: "accionesInferior",
          handler: () => {
            this.generarCSVAforos(';');
          }
        },
        {
          text: this.translate.instant("cancelar"),
          icon: "close",
          cssClass: "accionesInferior",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    /*Cuando se retorna, entonces se pinta*/
    await actionSheet.present();
  }

  generarPDFAforos() {
    /*Se llama al metodo de listar aforos definido en el servicio*/
    this.aforosService.getPDFAforos();
  }


  generarCSVAforos(caracter: string) {
    /*Se llama al metodo de listar aforos definido en el servicio*/
    this.aforosService.getCSVAforos(caracter);
  }
}
