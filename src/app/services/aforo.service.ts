import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { HelperService } from "../util/HelperService";
import { TranslateService } from "@ngx-translate/core";
import { ModelAforo } from "../interfaces/aforoInterface";

@Injectable({
  providedIn: "root"
})
export class AforoService {
  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  constructor(
    private   http          : HttpClient,
    public    helperService : HelperService,
    private   translate     : TranslateService
  ) {}

  getAforos() {
    return this.http.get<ModelAforo>(
      this.baseUrl + "Controller/Aforo/CtlAforo.php?action=list"
    );
  }
  getPDFAforos() {
    window.open(
      this.baseUrl + "Controller/Aforo/CtlAforo.php?action=generatePDFList",
      "_system",
      "location=yes"
    );
  }

  getCSVAforos(caracter: string) {
    console.log(this.baseUrl +
      "Controller/Aforo/CtlAforo.php?action=reportCSVList&caracter=" +
      caracter);
    window.open(
      this.baseUrl +
        "Controller/Aforo/CtlAforo.php?action=reportCSVList&caracter=" +
        caracter,
      "_system",
      "location=yes"
    );
  }

  /*Funcion que se encarga de registrar al rol, recibiendo por parametro
  los datos del rol*/
  saveAforoDataService(postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + "Controller/Aforo/CtlAforo.php";
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      data => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === "1") {
          /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
          this.helperService.showAlertRedirect(
            this.translate.instant("exitoTitulo"),
            this.translate.instant("exitoTransaccion"),
            "/aforos"
          );
        } else {
          if (res.code === "2") {
            /*Si no retorna uno es porque el registro*/
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("registroExistente")
            );
          } else {
            /*Si no retorna uno es porque el usuario ya existe*/
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("errorTransaccion")
            );
          }
        }
      },
      error => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Sino es porque se genero un error en el servidor*/
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorTransaccion")
        );
      }
    );
  }

  /*Funcion que se encarga de eliminar rol, recibiendo por parametro
  el id*/
  deleteAforoDataService(postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + "Controller/Aforo/CtlAforo.php";
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      data => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === "1") {
          /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
          this.helperService.showAlertRedirect(
            this.translate.instant("exitoTitulo"),
            this.translate.instant("exitoTransaccion"),
            "/aforos"
          );
        } else {
          if (res.code === "3") {
            /*Si no retorna uno es porque el rol ya existe*/
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("noSePuedeEliminar")
            );
          } else {
            /*Si no retorna uno es porque el rol ya existe*/
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("errorTransaccion")
            );
          }
        }
      },
      error => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Sino es porque se genero un error en el servidor*/
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorTransaccion")
        );
      }
    );
  }
}
