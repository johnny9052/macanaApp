import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ModelPermisos } from '../../interfaces/permisosInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ActionSheetController, Events } from '@ionic/angular';
import { PermisosService } from 'src/app/services/permisos.service';
import { HelperService } from 'src/app/util/HelperService';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModelRol } from 'src/app/interfaces/rolInterface';
import { RolesService } from 'src/app/services/roles.service';
import { ModelUserData } from 'src/app/interfaces/userInterface';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss']
})
export class PermisosPage implements OnInit {
  baseUrl = environment.baseUrl;

  permisos: ModelPermisos[] = [];
  roles: ModelRol[] = [];
  userData = {} as ModelUserData;

  codeUser = '';
  language = '';

  constructor(
    private blockAccess: BlockAccessService,
    private actionSheetCtrl: ActionSheetController,
    private permisosService: PermisosService,
    private rolesService: RolesService,
    public helperService: HelperService,
    private router: Router,
    private translate: TranslateService,
    private events: Events
  ) {}

  ionViewWillEnter() {
    // Se obtiene el identidicador del usuario que ingreso al sistema
    this.getRoles();
  }

  ngOnInit() {

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
      this.getPermisosData();
    });
  }

  getPermisosData() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.permisosService.getPermisos().subscribe(
      data => {
        let res: any;
        res = data;
        console.log(JSON.parse(res.data));
        this.permisos = JSON.parse(res.data);
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



  getRoles() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rolesService.getRoles().subscribe(
      data => {
        let res: any;
        res = data;
        console.log(JSON.parse(res.data));
        this.roles = JSON.parse(res.data);
        // this.helperService.ocultarBarraCarga();
        // Se obtiene el identidicador del usuario que ingreso al sistema
        this.getProfilePk();
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


  onSelectChange($event) {
    this.getPermisosAsignadosData();
  }



  getPermisosAsignadosData() {
    this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.permisosService.getPermisosAsignados(this.userData.rol_id).subscribe(
      data => {
        let res: any;
        res = data;
        console.log(JSON.parse(res.data));

        // this.permisos = JSON.parse(res.data);

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





}
