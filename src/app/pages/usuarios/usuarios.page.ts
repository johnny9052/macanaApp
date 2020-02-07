import { Component, OnInit } from '@angular/core';
import { ModelUserData } from 'src/app/interfaces/userInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ActionSheetController, Events } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: ModelUserData[] = [];

  codeUser = '';
  language = '';

  tiempoEspera = 1000;

  constructor(private blockAccess: BlockAccessService,
              private actionSheetCtrl: ActionSheetController,
              private usuariosService: UsuariosService,
              public helperService: HelperService,
              private router: Router,
              private translate: TranslateService,
              private events: Events) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getProfilePk();
  }

  getProfilePk() {
    // Se obtiene el identificador del usuario que ingreso al sistema
    this.helperService.getLocalData('profilePk').then(response => {
      this.codeUser = response;
      this.getLanguage();
    });
  }

  getLanguage() {
      // Se obtiene el idioma seleccionado
      this.helperService.getLocalData('language').then(response => {
        this.language = response;
        this.geUsuariosData();
      });
  }

  geUsuariosData() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.usuariosService.getUsuarios().subscribe(data => {

      let res: any;
      res = data;
      // console.log(JSON.parse(res.data));
      this.usuarios = JSON.parse(res.data);
      this.helperService.ocultarBarraCarga();
    },
    error => {
      this.helperService.ocultarBarraCarga();
      this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    }
  );
  }



  refreshPost(event) {
    this.usuariosService.getUsuarios().subscribe(data => {
      let res: any;
      res = data;
      // console.log(JSON.parse(res.data));
      this.usuarios = JSON.parse(res.data);
      event.target.complete();
    },
    error => {
      event.target.complete();
      this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    });
  }


  viewUser(pk: string, primerNombre: string, segundoNombre: string, primerApellido: string,
           segundoApellido: string, cedula: string, correo: string, celular: string, foto: string,
           usuario: string, rolId: string, descripcion: string) {

     console.log(pk);

     const data: NavigationExtras = {
      state: {
        pk,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        cedula,
        correo,
        celular,
        foto,
        usuario,
        rolId,
        descripcion
      }
    };

     this.router.navigate(['usuarios-detail'], data);
  }

}
