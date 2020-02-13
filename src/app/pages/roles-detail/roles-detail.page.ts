import { Component, OnInit } from '@angular/core';
import { ModelRol } from 'src/app/interfaces/rolInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { RolesService } from 'src/app/services/roles.service';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles-detail',
  templateUrl: './roles-detail.page.html',
  styleUrls: ['./roles-detail.page.scss'],
})
export class RolesDetailPage implements OnInit {

    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    codeUser = '';

    /****************OBJETOS************************** */
    rolData = {} as ModelRol;
    /****************END OBJETOS************************** */


    /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    ProfileService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
    constructor(private blockAccess: BlockAccessService,
                public helperService: HelperService,
                public profileService: RolesService,
                public alertCtrl: AlertController,
                private route: ActivatedRoute,
                private router: Router
) {

  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {

      this.rolData.id = this.router.getCurrentNavigation().extras.state.id;
      this.rolData.nombre_rol = this.router.getCurrentNavigation().extras.state.nombreRol;
      this.rolData.descripcion = this.router.getCurrentNavigation().extras.state.descripcion;

    }
  });

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


  /*Funcion que se encarga de almacenar la informacion del rol*/
  saveRolData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.rolData.id);
    postDataObj.append('name' , this.rolData.nombre_rol);
    postDataObj.append('description' , this.helperService.fixNotRequiredValue(this.rolData.descripcion));

    if ( this.helperService.isValidValue(this.rolData.id)) {
      postDataObj.append('action' , 'update');
    } else {
      postDataObj.append('action' , 'save');
    }

    this.profileService.saveRolDataService(postDataObj);
  }


    /*Funcion que se encarga de almacenar la informacion del rol*/
  deleteRolData() {
      // tslint:disable-next-line: prefer-const
      let postDataObj = new FormData();
      postDataObj.append('id' , this.rolData.id);
      postDataObj.append('action' , 'delete');

      this.profileService.deleteRolDataService(postDataObj);
    }

}
