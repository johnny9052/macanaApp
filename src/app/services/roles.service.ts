import { Injectable } from '@angular/core';
import { ModelRol } from '../interfaces/rolInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private translate: TranslateService
  ) {}


  getRoles() {
    return this.http.get<ModelRol>(
      this.baseUrl + 'Controller/Configuration/CtlRol.php?action=list'
    );
  }



   /*Funcion que se encarga de registrar al rol, recibiendo por parametro
  los datos del rol*/
  saveRolDataService( postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + 'Controller/Configuration/CtlRol.php';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlertRedirect(
          this.translate.instant('exitoTitulo'),
          this.translate.instant('rolGuardado'),
          '/roles'
        );
      } else {
        /*Si no retorna uno es porque el usuario ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }





   /*Funcion que se encarga de eliminar rol, recibiendo por parametro
  el id*/
  deleteRolDataService( postData: any) {
    /*URL del web service*/
    const url = this.baseUrl + 'Controller/Configuration/CtlRol.php';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(data => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Se define una variable local para recibir la respuesta*/
      let res: any;
      res = data;
      /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
      if (res.code === '1') {
        /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
        redireccionara al login*/
        this.helperService.showAlertRedirect(
          this.translate.instant('exitoTitulo'),
          this.translate.instant('exitoTransaccion'),
          '/roles'
        );
      } else {
        /*Si no retorna uno es porque el rol ya existe*/
        this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
      }
    }, error => {
      /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
      this.helperService.ocultarBarraCarga();
      /*Sino es porque se genero un error en el servidor*/
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorTransaccion'));
    });
  }



}
