import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ModelUserData } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {}

  getUsuarios() {
    return this.http.get<ModelUserData>(
      'http://localhost/MacapaAppBackend/Controller/Configuration/CtlUser.php?action=list'
    );
  }

  async viewNotification(postData: any) {
    /*URL del web service*/
    const urlRegister =
      'https://flylinkers.com/es/notifications/notification_redirect_app/';
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
          if (res.code === '1' && res.idPost === '-2') {
            // this.helperService.showAlertRedirect('Exito', res.mensaje, '/network');
            this.navCtrl.navigateBack('/network');
          } else if (res.code === '1' && res.idPost === '-1') {
            // console.log('Parte 1');
            this.helperService.showAlert(
              this.translate.instant('errorTitulo'),
              res.mensaje
            );
          } else if (
            res.code === '1' &&
            res.idPost !== '-1' &&
            res.idPost !== '-2'
          ) {
            // console.log('Parte 2');
            // this.helperService.showAlert('Exito', res.mensaje);
          } else {
            // console.log('Parte 3');
            this.helperService.showAlert(
              this.translate.instant('errorTitulo'),
              this.translate.instant('notificacionElementoInexistente')
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
}
