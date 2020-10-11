import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';
import { ModelInsumoFumigacion } from '../interfaces/insumoFumigacioninterface';


@Injectable({
  providedIn: 'root'
})
export class InsumoFumigacionService {
  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private translate: TranslateService
  ) {}

  getInsumoFumigacion() {
    return this.http.get<ModelInsumoFumigacion>(
      this.baseUrl + "Controller/InsumoFumigacion/CtlInsumoFumigacion.php?action=list&token=" +
      this.helperService.generarToken()
    );
  }
  /*Funcion que se encarga de registrar al rol, recibiendo por parametro
  los datos del rol*/
  saveInsumoFumigacionDataService(postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + "Controller/InsumoFumigacion/CtlInsumoFumigacion.php";

    postData.append('token' , this.helperService.generarToken());

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
            "/insumo-fumigacion"
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
  deleteInsumoFumigacionDataService(postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + "Controller/InsumoFumigacion/CtlInsumoFumigacion.php";
    
    postData.append('token' , this.helperService.generarToken());
    
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
            "/insumo-fumigacion"
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
