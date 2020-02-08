import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { RolesService } from 'src/app/services/roles.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelUserData } from 'src/app/interfaces/userInterface';
import { ModelRol } from 'src/app/interfaces/rolInterface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.page.html',
  styleUrls: ['./usuarios-detail.page.scss']
})
export class UsuariosDetailPage implements OnInit {
  /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
  codeUser = '';

  /****************OBJETOS************************** */
  userData = {} as ModelUserData;
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
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private rolesService: RolesService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userData.id = this.router.getCurrentNavigation().extras.state.id;
        this.userData.primer_nombre = this.router.getCurrentNavigation().extras.state.primerNombre;
        this.userData.segundo_nombre = this.router.getCurrentNavigation().extras.state.segundoNombre;
        this.userData.primer_apellido = this.router.getCurrentNavigation().extras.state.primerApellido;
        this.userData.segundo_apellido = this.router.getCurrentNavigation().extras.state.segundoApellido;
        this.userData.cedula = this.router.getCurrentNavigation().extras.state.cedula;
        this.userData.correo = this.router.getCurrentNavigation().extras.state.correo;
        this.userData.celular = this.router.getCurrentNavigation().extras.state.celular;
        this.userData.foto = this.router.getCurrentNavigation().extras.state.foto;
        this.userData.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        this.userData.password = this.router.getCurrentNavigation().extras.state.password;
        this.userData.rol_nombre = this.router.getCurrentNavigation().extras.state.rolNombre;
        this.userData.rol_id = this.router.getCurrentNavigation().extras.state.rolId;
        this.userData.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;
      }
    });
  }

  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getRoles();
  }

  ngOnInit() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  /*Funcion que se encarga de obtener codigo del usuario que se encuentra identificado*/
  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
    });
  }

  getRoles() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rolesService.getRoles().subscribe(
      data => {
        let res: any;
        res = data;
        console.log(JSON.parse(res.data));
        this.roles = JSON.parse(res.data);
        this.helperService.ocultarBarraCarga();
      },
      error => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant('errorTitulo'),
          this.translate.instant('errorCargandoInformacion')
        );
        // console.log('oops', error);
      }
    );
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  saveUserData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id', this.userData.id);
    postDataObj.append('primerNombre', this.userData.primer_nombre);
    postDataObj.append('segundoNombre', this.userData.segundo_nombre);
    postDataObj.append('primerApellido', this.userData.primer_apellido);
    postDataObj.append('segundoApellido', this.userData.segundo_apellido);
    postDataObj.append('cedula', this.userData.cedula);
    postDataObj.append('correo', this.userData.correo);
    postDataObj.append('celular', this.userData.celular);
    postDataObj.append('foto', this.userData.foto);
    postDataObj.append('usuario', this.userData.usuario);

    if (this.helperService.isValidValue(this.userData.rol_id)) {
      postDataObj.append('rolId', this.userData.rol_id);
    } else {
      this.helperService.showAlert(
        this.translate.instant('alertaTitulo'),
        this.translate.instant('seleccioneRol')
      );
      return;
    }

    postDataObj.append('descripcion', this.userData.descripcion);

    if (this.helperService.isValidValue(this.userData.id)) {
      postDataObj.append('action', 'update');
    } else {
      if (this.helperService.isValidValue(this.userData.password)) {
        if (this.userData.password === this.userData.confirmarPassword) {
          console.log('coinciden');
          postDataObj.append('password', this.userData.password);
        } else {
          console.log('no coinciden');
          this.helperService.showAlert(
            this.translate.instant('alertaTitulo'),
            this.translate.instant('passwordNoCoiciden')
          );
          return;
        }

        postDataObj.append('action', 'save');
      } else {
        this.helperService.showAlert(
          this.translate.instant('alertaTitulo'),
          this.translate.instant('ingresePassword')
        );
        return;
      }
    }

    this.usuariosService.saveUserDataService(postDataObj);
  }

  /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteUserData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id', this.userData.id);
    postDataObj.append('action', 'delete');

    this.usuariosService.deleteUserDataService(postDataObj);
  }




  async restablecerPassword() {
    const input = await this.alertCtrl.create({
      header: this.translate.instant('restablecerPassword'),
      // message: 'Ingrese su nueva skill',
      inputs: [
        {
          name: 'nuevoPassword',
          id: 'txtNuevoPassword',
          type: 'password',
          placeholder: this.translate.instant('ingresePassword')
        },
        {
          name: 'nuevoPasswordConfirmar',
          id: 'txtNuevoPasswordConfirmar',
          type: 'password',
          placeholder: this.translate.instant('confirmarPassword')
        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: this.translate.instant('ok'),
          handler: async data => {
            // console.log('Confirm Ok', data);
            if(this.helperService.isValidValue(data.nuevoPassword)) {
            if (data.nuevoPassword === data.nuevoPasswordConfirmar) {
            // tslint:disable-next-line: prefer-const
            let postDataObj = new FormData();
            postDataObj.append('id', this.userData.id);
            postDataObj.append('password', data.nuevoPassword);
            postDataObj.append('action', 'updatePassword');

            this.usuariosService.updateUserPasswordService(postDataObj);
          } else {
            this.helperService.showAlert(
              this.translate.instant('alertaTitulo'),
              this.translate.instant('passwordNoCoiciden')
            );
          }
        } else {
          this.helperService.showAlert(
            this.translate.instant('alertaTitulo'),
            this.translate.instant('ingresePassword')
          );
        }
          }
        }
      ]
    });

    await input.present();
  }
}
