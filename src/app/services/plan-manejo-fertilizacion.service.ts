import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { HelperService } from "../util/HelperService";
import { TranslateService } from "@ngx-translate/core";
import { ModelRol } from "../interfaces/rolInterface";
import { ModelPlanManejoFertilizacionPotrero } from "../interfaces/planManejoFertilizacionPotreroInterface";
import { ModelPlanManejoFertilizacionFertilizante } from '../interfaces/ModelPlanManejoFertilizacionFertilizante';
import { ModelPotrero } from '../interfaces/potrerointerface';

@Injectable({
  providedIn: "root",
})
export class PlanManejoFertilizacionService {
  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private translate: TranslateService
  ) {}

  getPlanManejoFertilizacion() {
    return this.http.get<ModelRol>(
      this.baseUrl +
        "Controller/PlanManejo/CtlPlanManejoFertilizacion.php?action=list&token=" +
        this.helperService.generarToken()
    );
  }

  /*Funcion que se encarga de registrar al rol, recibiendo por parametro
  los datos del rol*/
  savePlanManejoFertilizacionDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl + "Controller/PlanManejo/CtlPlanManejoFertilizacion.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            "/plan-manejo-fertilizacion"
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
      (error) => {
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
  deletePlanManejoFertilizacionDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl + "Controller/PlanManejo/CtlPlanManejoFertilizacion.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            "/plan-manejo-fertilizacion"
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
      (error) => {
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

  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS POTREROS*********/
  /******************************************************/

  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListPotrerosPlanMenejoFertilizacion(idPlanFertilizacion: string) {
    return this.http.get<ModelPlanManejoFertilizacionPotrero>(
      this.baseUrl +
        "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php?action=list&idplanfertilizacion=" +
        idPlanFertilizacion +
        "&token=" +
        this.helperService.generarToken()
    );
  }

  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async savePlanManejoFertilizacionPotreroDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));

    // // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            this.translate.instant("registroExistente")
          );
        }
      },
      (error) => {
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




    /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async savePlanManejoFertilizacionPotreroPorRotacionDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));

    // // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            this.translate.instant("registroExistente")
          );
        }
      },
      (error) => {
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
  async deletePlanManejoFertilizacionPotreroDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
          if (res.code === "3") {            
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("noSePuedeEliminar")
            );
          } else {            
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("errorTransaccion")
            );
          }
        }
      },
      (error) => {
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

  /******************************************************/
  /*****END FUNCIONES DE GESTION DE LOS FERTILIZANTES****/
  /******************************************************/



  /******************************************************/
  /*********FUNCIONES DE GESTION DE LOS FERTILIZANTES****/
  /******************************************************/

  /*Obtiene todas las skills del usuario a traves de su PK*/
  getListFertilizantePlanMenejoFertilizacion(idPlanFertilizacion: string) {
    return this.http.get<ModelPlanManejoFertilizacionFertilizante>(
      this.baseUrl +
        "Controller/PlanManejo/CtlPlanManejoFertilizacionFertilizante.php?action=list&idplanfertilizacion=" +
        idPlanFertilizacion +
        "&token=" +
        this.helperService.generarToken()
    );
  }

  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async savePlanManejoFertilizacionFertilizanteDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionFertilizante.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));

    // // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            this.translate.instant("registroExistente")
          );
        }
      },
      (error) => {
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
  async deletePlanManejoFertilizacionFertilizanteDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionFertilizante.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
          if (res.code === "3") {            
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("noSePuedeEliminar")
            );
          } else {            
            this.helperService.showAlert(
              this.translate.instant("errorTitulo"),
              this.translate.instant("errorTransaccion")
            );
          }
        }
      },
      (error) => {
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

  /******************************************************/
  /*****END FUNCIONES DE GESTION DE LOS FERTILIZANTES****/
  /******************************************************/





  /******************************************************/
  /*****FUNCIONES DE GESTION DE POTREROS POR OPERARIO****/
  /******************************************************/


  /*Funcion que se encarga de registrar un nuevo skill, recibiendo por parametro
  el pk del usuario*/
  async savePlanManejoFertilizacionPotreroOperarioDataService(postData: any) {
    /*URL del web service*/
    const url =
      this.baseUrl +
      "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php";

    postData.append("token", this.helperService.generarToken());

    /*Se muestra una barra de carga*/
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));

    // // console.log(postData);

    /*Se envian los datos al servidor, enviando la url, los datos y la configuracion necesaria del header*/
    this.http.post(url, postData).subscribe(
      (data) => {
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
            this.translate.instant("registroExistente")
          );
        }
      },
      (error) => {
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




  getPotreroByPlanManejo(idPlanManejo: string) {
    return this.http.get<ModelPotrero>(
      this.baseUrl + "Controller/PlanManejo/CtlPlanManejoFertilizacionPotrero.php?action=listPotrerosByPlanesManejo&idplanfertilizacion="+idPlanManejo+"&token=" +
      this.helperService.generarToken()
    );
  }
  
  
  
  
  /*******************************************************/
  /*****END FUNCIONES DE GESTION DE POTREROS POR OPERARIO*/
  /*******************************************************/



}
