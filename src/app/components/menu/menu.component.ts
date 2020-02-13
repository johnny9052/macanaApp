import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  /* Datos que son almacenados localmente, y que se obtienen para ser mostrados en el menu*/
  codeUser = '';
  firstName = '';
  lastName = '';
  imagePerfil = '';

  /*Se obtiene la url del servidor para ser utilizado en el formulario*/
  baseUrl = environment.baseUrl;


  /* HelperService: Servicio generico que ofrece funcionalidades adicionales */
  constructor(public helperService: HelperService, public events: Events) {

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
  }

  ionViewWillEnter() {
    /* Cada vez que se carga el menu, se obtiene la informacion almacenada
    de forma local para ser mostrada en el menu*/
    this.getProfilePk();
    this.getProfileFirstName();
    this.getProfileLastName();
    this.getProfileImage();
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

  getProfileImage() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('image_perfil').then(response => {
      this.imagePerfil = response;
    });
  }


}
