import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ActionSheetController, Events } from '@ionic/angular';
import { HelperService } from 'src/app/util/HelperService';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RolesService } from 'src/app/services/roles.service';
import { ModelRol } from 'src/app/interfaces/rolInterface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  baseUrl = environment.baseUrl;

  roles: ModelRol[] = [];

  codeUser = '';
  language = '';

  tiempoEspera = 1000;

  constructor(private blockAccess: BlockAccessService,
              private actionSheetCtrl: ActionSheetController,
              private rolesService: RolesService,
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
        this.getRolesData();
      });
  }

  getRolesData() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rolesService.getRoles().subscribe(data => {

      let res: any;
      res = data;
      console.log(JSON.parse(res.data));
      this.roles = JSON.parse(res.data);
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
    this.rolesService.getRoles().subscribe(data => {
      let res: any;
      res = data;
      // console.log(JSON.parse(res.data));
      this.roles = JSON.parse(res.data);
      event.target.complete();
    },
    error => {
      event.target.complete();
      this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
      // console.log('oops', error);
    });
  }


  viewRol(id: string, nombreRol: string, descripcion: string) {

     console.log(id);

     const data: NavigationExtras = {
      state: {
        id,
        nombreRol,
        descripcion
      }
    };

     this.router.navigate(['roles-detail'], data);
  }

}
