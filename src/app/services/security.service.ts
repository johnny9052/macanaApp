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

  /* Se obtiene la url global definida en el archivo environment*/
  baseUrl = environment.baseUrl;

  /*Dependencias del servicio
  http: Dependencia para las peticiones al servidor
  alertCtrl: Depedencia para los modales,
  HelperService: Clase utilitaria,
  TranslateService: Servicio para internacionalizacion,
  Events: Dependencia que permite ejecutar eventos, en este caso el definido
          en el componente Menu*/
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    public helperService: HelperService,
    private translate: TranslateService,
    public events: Events
  ) {}

  /*Definicion del header funcional para envios via post, utilizado cuando se va a
  consumir un API REST, pero no es necesario para un webService con peticiones HTTP*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });



  /*Funcion que se encarga de identificar al usuario, recibiendo por parametro
  sus datos de acceso*/
  logInUser(postData: any) {

    /* Se define la url del WebService*/
    const urlLogIn = this.baseUrl + 'Controller/Security/CtlLogIn.php';

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));

    /*Se envian los datos al servidor, enviando la url y los datos*/
    this.http.post(urlLogIn, postData).subscribe(
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
          this.helperService.saveLocalData('profilePk', res.profilePk);
          this.helperService.saveLocalData('firstName', res.firstName);
          this.helperService.saveLocalData('lastName', res.lastName);
          this.helperService.saveLocalData('typeUser', res.typeUser);
          this.helperService.saveLocalData('image_perfil', res.image_perfil);
          this.helperService.saveLocalData('typeUserName', res.typeUserName);

          /*Se activa el evento user:logIn, el cual se registro en el menu, para que tan pronto se identique
          un usuario, se actualice la informacion en pantalla*/
          this.events.publish('user:logIn');

           /*Se llama el metodo utilitario showAlertRedirect, que muestra un modal informativo y cuando se cierra 
            redirecciona*/
            // tslint:disable-next-line: max-line-length
          this.helperService.showAlertRedirect(
              this.translate.instant('exitoTitulo'),
              this.translate.instant('usuarioIdentificado'),
              '/master-page'
            );

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
      }
    );
  }
}
