import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { environment } from '../../../environments/environment';
import { ThrowStmt } from '@angular/compiler';
import { PermisosService } from 'src/app/services/permisos.service';
import { ModelPermisos } from 'src/app/interfaces/permisosInterface';
import { ModelPermisosOtorgados } from 'src/app/interfaces/permisosOtorgadosInterface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  permisos: ModelPermisos[] = [];
  permisosOtorgados: ModelPermisosOtorgados[] = [];


  /* Datos que son almacenados localmente, y que se obtienen para ser mostrados en el menu*/
  codeUser = '';
  firstName = '';
  lastName = '';
  imagePerfil = '';
  rolId = '';

  /*Se obtiene la url del servidor para ser utilizado en el formulario*/
  baseUrl = environment.baseUrl;


  /* HelperService: Servicio generico que ofrece funcionalidades adicionales */
  constructor(public  helperService   : HelperService, 
              public  events          : Events,
              private permisosService : PermisosService,
              private translate       : TranslateService) {

    /*Se registra el evento user:login, para que cuando este sea llamado cuando el
    usuario se identifica correctamente, se actualice la informacion del menu, y
    toca ejecutarlo 1 segundo despues, dando tiempo que la informacion sea
    almacenada de manera local*/
    events.subscribe('user:logIn', () => {
      setTimeout(() => {
        this.getProfilePk();
        this.getProfileFirstName();
        this.getProfileLastName();
        this.getProfileImage();
        this.getTypeUser();
      }, 1000);

    });
  }


  ngOnInit() {
    /* Cuando se ejecuta la primera vez, se obtiene la informacion almacenada
    de forma local para ser mostrada en el menu*/
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
    this.getPermisosData();
    this.getTypeUser();
  }

  ionViewWillEnter() {
    /* Cada vez que se carga el menu, se obtiene la informacion almacenada
    de forma local para ser mostrada en el menu*/
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
    this.getPermisosData();
    this.getTypeUser();
  }


  getPermisosAsignadosData() {
    this.permisosService.getPermisosAsignados(this.rolId).subscribe(
      data => {
        let res: any;
        res = data;

        this.limpiarPermisosOtorgados();

        if (res.data.length > 0) {
          // console.log(JSON.parse(res.data));

          this.permisosOtorgados = JSON.parse(res.data);

          this.permisosOtorgados.forEach(permisoOtorgado => {
            if (permisoOtorgado.idrol === this.rolId) {
              this.permisos.forEach(menu => {
                if (menu.id === permisoOtorgado.idmenu) {
                  menu.activo = true;
                }
              });
            }
          });
        }
      },
      error => {
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
        // console.log('oops', error);
      }
    );
  }


  limpiarPermisosOtorgados(){
    this.permisos.forEach(menu => {
        menu.activo = false;
      
    });
  }



  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
    });
  }

  getProfileFirstName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('firstName').then(response => {
      this.firstName = response;
    });
  }

  getProfileLastName() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('lastName').then(response => {
      this.lastName = response;
    });
  }

  getTypeUser() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('typeUser').then(response => {
      this.rolId = response;
      this.getPermisosAsignadosData();
    });
  }


  getProfileImage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('image_perfil').then(response => {
      this.imagePerfil = response;
    });
  }


  getPermisosData() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.permisosService.getPermisos().subscribe(
      data => {
        let res: any;
        res = data;
        this.permisos = JSON.parse(res.data);
      },
      error => {
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
        // console.log('oops', error);
      }
    );
  }



}
