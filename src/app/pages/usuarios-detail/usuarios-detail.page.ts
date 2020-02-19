import { Component, OnInit } from "@angular/core";
import { BlockAccessService } from "src/app/util/blockAccess";
import { HelperService } from "src/app/util/HelperService";
import { RolesService } from "src/app/services/roles.service";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModelUserData } from "src/app/interfaces/userInterface";
import { ModelRol } from "src/app/interfaces/rolInterface";
import { UsuariosService } from "src/app/services/usuarios.service";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from "@ionic-native/base64/ngx";

import { environment } from "../../../environments/environment";

/*Variable global declarada para que no se marque error al momento de utilizar
el resultado de la camara como un file y no como base64*/
declare var window: any;

@Component({
  selector: "app-usuarios-detail",
  templateUrl: "./usuarios-detail.page.html",
  styleUrls: ["./usuarios-detail.page.scss"]
})
export class UsuariosDetailPage implements OnInit {
  baseUrl = environment.baseUrl;

  editoImagen = false;
  imagenesEliminar = new Array();

  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = "";

  /****************OBJETOS************************** */
  userData = {} as ModelUserData;
  /* Un objeto que contendra temporalmente los datos que llegan del extra, con el fin de esperar un X tiempo 
  y luego setearlos a la objData, dando tiempo a que se llenen los selects y se refresquen en pantalla*/
  userDataTemp = {} as ModelUserData;
  roles: ModelRol[] = [];
  /****************END OBJETOS************************** */

  /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    ProfileService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
  constructor(
    private blockAccess: BlockAccessService,
    public helperService: HelperService,
    public usuariosService: UsuariosService,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private rolesService: RolesService,
    private camera: Camera,
    private base64: Base64
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userDataTemp.id = this.router.getCurrentNavigation().extras.state.id;
        this.userDataTemp.primer_nombre = this.router.getCurrentNavigation().extras.state.primerNombre;
        this.userDataTemp.segundo_nombre = this.router.getCurrentNavigation().extras.state.segundoNombre;
        this.userDataTemp.primer_apellido = this.router.getCurrentNavigation().extras.state.primerApellido;
        this.userDataTemp.segundo_apellido = this.router.getCurrentNavigation().extras.state.segundoApellido;
        this.userDataTemp.cedula = this.router.getCurrentNavigation().extras.state.cedula;
        this.userDataTemp.correo = this.router.getCurrentNavigation().extras.state.correo;
        this.userDataTemp.celular = this.router.getCurrentNavigation().extras.state.celular;
        this.userDataTemp.foto = this.router.getCurrentNavigation().extras.state.foto;
        this.userDataTemp.foto_copia_ruta_original = this.router.getCurrentNavigation().extras.state.fotoCopiaRutaOriginal;

        // tslint:disable-next-line: max-line-length
        this.userDataTemp.foto = this.helperService.isValidValue(this.userDataTemp.foto)
          ? this.baseUrl + this.userDataTemp.foto
          : this.userDataTemp.foto;

        this.userDataTemp.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        this.userDataTemp.password = this.router.getCurrentNavigation().extras.state.password;
        this.userDataTemp.rol_nombre = this.router.getCurrentNavigation().extras.state.rolNombre;
        this.userDataTemp.rol_id = this.router.getCurrentNavigation().extras.state.rolId;
        this.userDataTemp.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;
      }
    });
  }

  ionViewWillEnter() {
    this.editoImagen = false;
    this.imagenesEliminar = new Array();
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getRoles();

     /* Despues de que se llenan los selects, se espera 250 milisegundos para poder regresar los datos */
     setTimeout(() => {
      this.userData = this.userDataTemp;
    }, 250);

  }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData("profilePk").then(response => {
      this.codeUser = response;
    });
  }

  getRoles() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant("espere"));
    this.rolesService.getRoles().subscribe(
      data => {
        let res: any;
        res = data;
        this.roles = JSON.parse(res.data);
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
      }
    );
  }

  /*Funcion que se encarga de almacenar la informacion del usuario*/
  saveUserData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();

    /*Se anexa la informacion basica del usuario*/
    postDataObj.append("id", this.userData.id);
    postDataObj.append("primerNombre", this.userData.primer_nombre);
    postDataObj.append(
      "segundoNombre",
      this.helperService.fixNotRequiredValue(this.userData.segundo_nombre)
    );
    postDataObj.append("primerApellido", this.userData.primer_apellido);
    postDataObj.append(
      "segundoApellido",
      this.helperService.fixNotRequiredValue(this.userData.segundo_apellido)
    );
    postDataObj.append("cedula", this.userData.cedula);
    postDataObj.append(
      "correo",
      this.helperService.fixNotRequiredValue(this.userData.correo)
    );
    postDataObj.append(
      "celular",
      this.helperService.fixNotRequiredValue(this.userData.celular)
    );
    postDataObj.append("usuario", this.userData.usuario);
    postDataObj.append("descripcion", this.userData.descripcion);

    /*************SECCION DE INFORMACION DE LAS FOTOS************************************/

    /*Se anexa la informacion de la foto, esta almacena la ruta de la foto*/
    postDataObj.append(
      "foto",
      this.helperService.fixNotRequiredValue(this.userData.foto)
    );
    /*Esta variable se utiliza como una copia de la ruta original de la foto, ya que una es la ruta que queda en
    la base de datos, y otra la que se estructura para cargar la imagen desde el app*/
    postDataObj.append(
      "fotoCopiaRutaOriginal",
      this.helperService.fixNotRequiredValue(
        this.userData.foto_copia_ruta_original
      )
    );
    /*Valor boleando que indica si se actualizo o no una foto*/
    postDataObj.append("seActualizoFoto", this.editoImagen.toString());
    /*Se valida si se genero una foto a base64, sino es asi se reemplaza por un -1*/
    this.userData.fotoBase64 = this.helperService.isValidValue(
      this.userData.fotoBase64
    )
      ? this.userData.fotoBase64
      : "-1";
    /*Dicha variable se almacena en una variable llamada base64File0, y el ultimo numero lo que hace es referenciar si es
    la imagen 1 o la X, debido a que el web Service puede recibir N imagenes. Ademas se reemplaza el texto del metodo ya que
    angular cuando lo codifica genera esa seccion de ruido*/
    postDataObj.append(
      "base64File" + "0",
      this.userData.fotoBase64.replace("data:image/*;charset=utf-8;base64,", "")
    );
    /*Al igual que el anterior, se almacena el nombre del archivo convertido en base64 para ser generado en el lado del 
    servidor*/
    // tslint:disable-next-line: max-line-length
    postDataObj.append(
      "nameFile" + "0",
      this.helperService.isValidValue(this.userData.fotoNombreBase64)
        ? this.userData.fotoNombreBase64
        : "-1"
    );
    /*Cada vez que se elimina o actualiza una imagen, se anaden al array imagenesEliminar, aqui se recorre una a una
    para anadirlas dinamicamente y se eliminan todas en el webService*/
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.imagenesEliminar.length; x++) {
      postDataObj.append("nameFileDelete" + x, this.imagenesEliminar[x]);
    }

    /*************END SECCION DE INFORMACION DE LAS FOTOS************************************/

    /*Se valida si se ha seleccionado un rol en el select, para saber si se le solicita al usuario*/
    if (this.helperService.isValidValue(this.userData.rol_id)) {
      postDataObj.append("rolId", this.userData.rol_id);
    } else {
      this.helperService.showAlert(
        this.translate.instant("alertaTitulo"),
        this.translate.instant("seleccioneRol")
      );
      return;
    }

    /*Se valida si se tiene o no un ID, si se tiene es porque se cargo un registro y se esta actualizando, 
    sino es porque se va a guardar*/
    if (this.helperService.isValidValue(this.userData.id)) {
      postDataObj.append("action", "update");
    } else {
      /*Se valida si las contrasenas coinciden*/
      if (this.helperService.isValidValue(this.userData.password)) {
        if (this.userData.password === this.userData.confirmarPassword) {
          postDataObj.append("password", this.userData.password);
        } else {
          this.helperService.showAlert(
            this.translate.instant("alertaTitulo"),
            this.translate.instant("passwordNoCoiciden")
          );
          return;
        }

        postDataObj.append("action", "save");
      } else {
        this.helperService.showAlert(
          this.translate.instant("alertaTitulo"),
          this.translate.instant("ingresePassword")
        );
        return;
      }
    }

    /*Se llama al metodo del servicio que se encarga de consumir el webService*/
    this.usuariosService.saveUserDataService(postDataObj);
  }

  /*Funcion que se encarga de eliminar un usuario*/
  deleteUserData() {
    /*Se indica que la foto actual se debe eliminar al lado del servidor*/
    this.agregarImagenEliminar();

    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append("id", this.userData.id);
    postDataObj.append("action", "delete");

    /*Se agrega la imagen a eliminar*/

    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.imagenesEliminar.length; x++) {
      // tslint:disable-next-line: max-line-length
      postDataObj.append("nameFileDelete" + x, this.imagenesEliminar[x]);
    }

    this.usuariosService.deleteUserDataService(postDataObj);
  }

  async restablecerPassword() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant("restablecerPassword"),
      inputs: [
        {
          name: "nuevoPassword",
          id: "txtNuevoPassword",
          type: "password",
          placeholder: this.translate.instant("ingresePassword")
        },
        {
          name: "nuevoPasswordConfirmar",
          id: "txtNuevoPasswordConfirmar",
          type: "password",
          placeholder: this.translate.instant("confirmarPassword")
        }
      ],
      buttons: [
        {
          text: this.translate.instant("cancelar"),
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: this.translate.instant("ok"),
          handler: async data => {
            if (this.helperService.isValidValue(data.nuevoPassword)) {
              if (data.nuevoPassword === data.nuevoPasswordConfirmar) {
                // tslint:disable-next-line: prefer-const
                let postDataObj = new FormData();
                postDataObj.append("id", this.userData.id);
                postDataObj.append("password", data.nuevoPassword);
                postDataObj.append("action", "updatePassword");

                this.usuariosService.updateUserPasswordService(postDataObj);
              } else {
                this.helperService.showAlert(
                  this.translate.instant("alertaTitulo"),
                  this.translate.instant("passwordNoCoiciden")
                );
              }
            } else {
              this.helperService.showAlert(
                this.translate.instant("alertaTitulo"),
                this.translate.instant("ingresePassword")
              );
            }
          }
        }
      ]
    });

    await input.present();
  }

  takePictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.agregarImagenEliminar();
    this.procesarImagenBase64(options);
  }

  procesarImagenBase64(options: CameraOptions) {
    this.camera.getPicture(options).then(
      imageData => {
        const rutaLocalHost = window.Ionic.WebView.convertFileSrc(imageData);

        let nameFile = rutaLocalHost.split(".")[
          rutaLocalHost.split(".").length - 2
        ];
        nameFile = nameFile.split("/")[nameFile.split("/").length - 1];

        const filePath = imageData;
        this.base64.encodeFile(filePath).then(
          (base64File: string) => {
            this.userData.fotoBase64 = base64File;
            this.userData.foto = rutaLocalHost;
            this.userData.fotoNombreBase64 = nameFile;
          },
          err => {
            // console.log(err);
          }
        );
      },
      err => {
        // Handle error
      }
    );
  }

  loadPictureBase64() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.agregarImagenEliminar();
    this.procesarImagenBase64(options);
  }

  /*Metodo que se ejecuta cuando se esta editando una foto, para registrar que se actualizo, 
  y se manda su ruta original para ser eliminada en el servidor*/
  agregarImagenEliminar() {
    // Si se cargo la info para editarla
    if (this.helperService.isValidValue(this.userData.id)) {
      this.editoImagen = true;
      this.imagenesEliminar.push(this.userData.foto_copia_ruta_original);
    }
  }
}
