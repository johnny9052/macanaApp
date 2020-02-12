import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, Events } from '@ionic/angular';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  baseUrl = environment.baseUrl;

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



  /*Funcion que se encarga de identificar al usuario, recibiendo por parametro
  sus datos de acceso*/
  logInUser(postData: any) {
    const urlLogIn = this.baseUrl + 'Controller/Security/CtlLogIn.php';


    console.log('*******************************************************');
    console.log('*************VAMOS A MANDAR DATOS***********************');
    console.log(urlLogIn);
    console.log(postData);
    console.log('*******************************************************');


    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    /*Se envian los datos al servidor, enviando la url y los datos*/
    this.http.post(urlLogIn, postData).subscribe(
      data => {


        console.log('*******************************************************');
        console.log('*************LLEGO RESPUESTA***********************');

        /*Se Oculta la barra de carga tan pronto se recibe una respuesta*/
        this.helperService.ocultarBarraCarga();
        /*Se define una variable local para recibir la respuesta*/
        let res: any;
        res = data;
        /*Si el codigo enviado por el servidor es 1, es porque fue exitoso el registro*/
        if (res.code === '1') {
          // console.log(res);
          /*Se almacena de manera local el identificador del usuario*/
          this.helperService.saveLocalData('profilePk', res.profilePk);
          this.helperService.saveLocalData('firstName', res.firstName);
          this.helperService.saveLocalData('lastName', res.lastName);
          this.helperService.saveLocalData('typeUser', res.typeUser);
          this.helperService.saveLocalData('image_perfil', res.image_perfil);
          this.helperService.saveLocalData('typeUserName', res.typeUserName);

          /*Se activa el evento user:logIn, el cual se registro en el menu, para que tan pronto se identique
          un usuario, se actualice la informacion en pantalla*/
          this.events.publish('user:logIn');

          if (res.perfil !== '-1') {
            /* console.log('***********************************************');
            console.log(res.perfil); */
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


        console.log('*******************************************************');
        console.log('*************SE GENERO UN ERROR***********************');

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
