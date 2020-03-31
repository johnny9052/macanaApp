import { Component, OnInit } from '@angular/core';
import { ModelPlanDeManejo } from '../../interfaces/plandemanejointerface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { PlanDeManejoService} from 'src/app/services/plandemanejo.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plan-de-manejo-detail',
  templateUrl: './plan-de-manejo-detail.page.html',
  styleUrls: ['./plan-de-manejo-detail.page.scss'],
})
export class PlanDeManejoDetailPage implements OnInit {

  /*Almacena la configuracion del calendar*/
  customPickerOptions;
    /*************CODIGO GLOBAL DEL USUARIO IDENTIFICADO********************* */
    codeUser = '';

    /****************OBJETOS************************** */
    plandemanejoData = {} as ModelPlanDeManejo;
    /****************END OBJETOS************************** */


    /********************INYECCION DE DEPENDENCIAS********* */
  /*HelperService: Servicio generico para funcionalidades ya implementadas
    rolService: Servicio para el consumo de web services del perfil
    AlertController: Permite mostrar alerts emergentes en pantalla */
    constructor(private blockAccess: BlockAccessService,
                public helperService: HelperService,
                public plandemanejoService: PlanDeManejoService,
                public alertCtrl: AlertController,
                private route: ActivatedRoute,
                private router: Router
) {

   this.route.queryParams.subscribe(params => {
     if (this.router.getCurrentNavigation().extras.state) {

       this.plandemanejoData.id = this.router.getCurrentNavigation().extras.state.id;
       this.plandemanejoData.fecha = this.router.getCurrentNavigation().extras.state.fecha;
       this.plandemanejoData.nombre = this.router.getCurrentNavigation().extras.state.nombre;
       this.plandemanejoData.idResponsable = this.router.getCurrentNavigation().extras.state.idResponsable;
       this.plandemanejoData.observaciones= this.router.getCurrentNavigation().extras.state.observaciones;

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
  savePLanDeManejoData() {
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('id' , this.plandemanejoData.id);
    postDataObj.append('fecha' , this.plandemanejoData.fecha);
    postDataObj.append('nombre' , this.plandemanejoData.nombre);
    postDataObj.append('idResponsable' , this.codeUser);
    postDataObj.append('observaciones' , this.helperService.fixNotRequiredValue(this.plandemanejoData.observaciones));

    if ( this.helperService.isValidValue(this.plandemanejoData.id)) {
      postDataObj.append('action' , 'update');
    } else {
      postDataObj.append('action' , 'save');
    }

    this.plandemanejoService.savePlanDeManejoDataService(postDataObj);
  }


    /*Funcion que se encarga de almacenar la informacion del rol*/
   deletePlanDeManejoData() {
        //tslint:disable-next-line: prefer-const
       let postDataObj = new FormData();
       postDataObj.append('id' , this.plandemanejoData.id);
       postDataObj.append('action' , 'delete');

       this.plandemanejoService.deletePlanDeManejoDataService(postDataObj);
     }


}
