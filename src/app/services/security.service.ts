import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, Events } from '@ionic/angular';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria
  */
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    public helperService: HelperService,
    private translate: TranslateService,
    public events: Events
  ) {}

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
los datos del usuario*/
  registerUser(postData: any) {
    /*URL del web service*/
    const urlRegister = 'https://flylinkers.com/es/registerApp/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http
      .post(urlRegister, postData, { headers: this.headersPost })
      .subscribe(
        data => {
          /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
          this.helperService.ocultarBarraCarga();
          /*Se define una variable local para recibir la respuesta*/
          let res: any;
          res = data;
          /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
          if (res.code === '1') {
            /*Se muestra un modal indicando que el registro fue exitoso, el cual al ser presionado
redireccionara al login*/
            // tslint:disable-next-line: max-line-length
            this.helperService.showAlertRedirect(
              this.translate.instant('exitoTitulo'),
              this.translate.instant('nuevoUsuarioExito'),
              '/identify'
            );
          } else {
            /*Si no retorna uno es porque el usuario ya existe*/
            this.helperService.showAlert(
              this.translate.instant('errorTitulo'),
              this.translate.instant('nuevoUsuarioExistente')
            );
          }
        },
        error => {
          /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
          this.helperService.ocultarBarraCarga();
          /*Sino es porque se genero un error en el servidor*/
          this.helperService.showAlert(
            this.translate.instant('errorTitulo'),
            this.translate.instant('errorTransaccion')
          );
        }
      );
  }

  /*Funcion que se encarga de identificar al usuario, recibiendo por parametro
sus datos de acceso*/
  logInUser(postData: any) {
    const urlLogIn = 'https://flylinkers.com/es/login_user_app/';
    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    /*Se envian los datos al servidor, enviando la url y los datos*/
    this.http.post(urlLogIn, postData, { headers: this.headersPost }).subscribe(
      data => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === '1') {
          // console.log(res);
          /*Se almacena de manera local el identificador del usuario*/
          this.helperService.saveLocalData('profilePk', res.userPk);
          this.helperService.saveLocalData('firstName', res.firstName);
          this.helperService.saveLocalData('lastName', res.lastName);
          this.helperService.saveLocalData('image_perfil', res.image_perfil);
          this.helperService.saveLocalData('profileUser', res.perfil);

          /*Se activa el evento user:logIn, el cual se registro en el menu, para que tan pronto se identique
un usuario, se actualice la informacion en pantalla*/
          this.events.publish('user:logIn');

          if (res.perfil !== '-1') {
            console.log('***********************************************');
            console.log(res.perfil);
            /*Se valida si el usuario ya actualizo los datos del perfil o no para saber si se manda al home o
a actualizar los datos de perfil*/
            // tslint:disable-next-line: max-line-length
            this.helperService.showAlertRedirect(
              this.translate.instant('exitoTitulo'),
              this.translate.instant('usuarioIdentificado'),
              '/master-page'
            );
          } else {
            // tslint:disable-next-line: max-line-length
            this.helperService.showAlertRedirect(
              this.translate.instant('exitoTitulo'),
              this.translate.instant('usuarioIdentificado'),
              '/profile-edit'
            );
          }
        } else {
          /*Si no retorna uno es porque el usuario no existe*/
          this.helperService.showAlert(
            this.translate.instant('errorTitulo'),
            this.translate.instant('usuarioNoExiste')
          );
        }
      },
      error => {
        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Sino es porque se genero un error en el servidor*/
        this.helperService.showAlert(
          this.translate.instant('errorTitulo'),
          this.translate.instant('errorTransaccion')
        );
        // this.helperService.showAlertRedirect('Exito', 'Usuario identificado correctamente', '/profile-edit');
      }
    );
  }
}
