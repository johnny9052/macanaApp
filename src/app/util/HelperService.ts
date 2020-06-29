import { Injectable } from "@angular/core";
import {
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";

import { Md5 } from "ts-md5/dist/md5";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  /*Barra de carga mostrada al usuario*/
  loading: any;
  /*Variable bandera que indicara si hay una peticion pendiente
  de una apertura de una barra de carga*/
  isLoadingLoadModal = false;

  public activeLang = "es";

  myDate = new Date();

  /*Dependencias del servicio
  alertCtrl: Depedencia para los modales
  loadingCtrl: Dependencia para las barras de carga,
  Storage: Almacenamiento local*/
  constructor(
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private translate: TranslateService,
    private datePipe: DatePipe
  ) {
    // this.translateService.setDefaultLang(this.activeLang);
    this.cargarIdiomaActual();
    this.generarToken();
  }

  saveLocalData(dataName: string, val: string) {
    this.storage.set(dataName, val);
  }

  removeLocalData(dataName: string) {
    this.storage.remove(dataName);
  }

  async getLocalData(dataName: string) {
    return await this.storage.get(dataName);
  }

  /*Funcion que muestra un modal, con su titulo y descripcion*/
  async showAlert(titulo: string, descripcion: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: descripcion,
      buttons: [
        {
          text: this.translate.instant("aceptar"),
          cssClass: "flylinkersColor",
          handler: (blah) => {
            // // console.log('Boton OK');
          },
        },
      ],
    });

    await alert.present();
  }

  /*Funcion que se encarga de mostrar un modal de registro exitoso y
  redireccionar al login*/
  async showAlertRedirect(
    titulo: string,
    mensaje: string,
    redirectURL: string
  ) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: this.translate.instant("aceptar"),
          cssClass: "flylinkersColor",
          handler: (blah) => {
            /*Cuando se da tap en aceptar redirecciona al login*/
            this.navCtrl.navigateForward(redirectURL);
          },
        },
      ],
    });

    await alert.present();
  }

  redireccionar(redirectURL: string) {
    this.navCtrl.navigateForward(redirectURL);
  }

  /*Funcion que muestra una barra de carga con un mensaje*/
  async mostrarBarraDeCarga(mensaje: string) {
    /*Antes de crear un nuevo mensaje de carga se verifica que no haya una peticion
    pendiente*/
    if (this.loading != null) {
      this.loading.dismiss();
    }

    /*Se establece la variable global bandera que indica que se establecera una nueva
    peticion de apertura de la barra de carga*/
    this.isLoadingLoadModal = true;
    /*Se inicia el proceso asincrono de la apertura de la barra de carga*/
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
    });
    /*Si la peticion aun sigue activa (y no ha habido un proceso de cierre mientras que
      se creaba que cambie la variable) entonces se muestra la barra de carga, de lo
      contrario se omite mostrar la barra de carga creada la cual tado un tiempo*/
    if (this.isLoadingLoadModal) {
      this.isLoadingLoadModal = false;
      return this.loading.present();
    }
  }

  /*Funcion que oculta la barra de carga que se encuentre mostrando en el momento*/
  ocultarBarraCarga() {
    /*Se cambia la bandera indicando que no se puede mostrar la barra si dado el caso
    esta se esta creando*/
    this.isLoadingLoadModal = false;
    /*Si exite una barra de carga que ya se encuentre mostrandoce, entonces se cierra*/
    if (this.loading != null) {
      this.loading.dismiss();
    }
  }

  abrirUrlExterna(url: string) {
    window.open(url, "_system");
  }

  isValidValue(val: string) {
    //console.log("valor a evaluar "+ val);

    if (
      val !== undefined &&
      val !== "undefined" &&
      val !== null &&
      val !== "null" &&
      val !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  fixNotRequiredValue(val: string) {
    if (
      val !== undefined &&
      val !== "undefined" &&
      val !== null &&
      val !== "null" &&
      val !== ""
    ) {
      return val;
    } else {
      return "";
    }
  }

  fixNotRequiredValueByCharacter(val: string) {
    if (
      val !== undefined &&
      val !== "undefined" &&
      val !== null &&
      val !== "null" &&
      val !== ""
    ) {
      return "1";
    } else {
      return "";
    }
  }

  public cambiarLenguaje(lang) {
    this.saveLocalData("language", lang);
    this.activeLang = lang;
    this.translate.use(this.activeLang);
  }

  public cargarIdiomaActual() {
    this.getLocalData("language").then((response) => {
      if (this.isValidValue(response)) {
        this.cambiarLenguaje(response);
      } else {
        this.cambiarLenguaje("en");
      }
    });
  }

  public generarToken() {
    let fechaActual = this.datePipe.transform(this.myDate, "dd/MM/yyyy");
    let palabraClave = "mAcAnAaPp";
    let token = palabraClave + fechaActual;
    /* console.log("Lo que se va a codificar es " + token); */
    const md5 = new Md5();
    let tokenApp = md5.appendStr(token).end();
    return tokenApp;
  }

  public fechaActual() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return (day + "/" + month + "/" + year);
  }
}
