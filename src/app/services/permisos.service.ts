import { Injectable } from "@angular/core";
import { ModelPermisos } from "../interfaces/permisosInterface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HelperService } from "../util/HelperService";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../environments/environment";
import { ModelPermisosOtorgados } from "../interfaces/permisosOtorgadosInterface";

@Injectable({
  providedIn: "root"
})
export class PermisosService {
  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded"
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {}

  getPermisos() {
    return this.http.get<ModelPermisos>(
      this.baseUrl +
        "Controller/Configuration/CtlPermission.php?action=loadSimple&token=" +
        this.helperService.generarToken()
    );
  }

  getPermisosAsignados(idRol: any) {
    return this.http.get<ModelPermisosOtorgados>(
      this.baseUrl +
        "Controller/Configuration/CtlPermission.php?action=loadAsignados&id=" +
        idRol +
        "&token=" +
        this.helperService.generarToken()
    );
  }

  /*Funcion que se encarga de registrar al usuario, recibiendo por parametro
  los datos del usuario*/
  savePermisosDataService(postData: any) {
    // console.log(postData);
    /*URL del web service*/
    const url = this.baseUrl + "Controller/Configuration/CtlPermission.php";

    postData.append("token", this.helperService.generarToken());

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
          this.helperService.showAlert(
            this.translate.instant("exitoTitulo"),
            this.translate.instant("exitoTransaccion")
          );
        } else {
          /*Si no retorna uno es porque el usuario ya existe*/
          this.helperService.showAlert(
            this.translate.instant("errorTitulo"),
            this.translate.instant("errorTransaccion")
          );
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
