import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelVaca } from 'src/app/interfaces/vacaInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { VacasService } from 'src/app/services/vacas.service';
import { HelperService } from 'src/app/util/HelperService';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vacas',
  templateUrl: './vacas.page.html',
  styleUrls: ['./vacas.page.scss'],
})
export class VacasPage implements OnInit {

  
/* Se obtiene la url global definida en el archivo environment*/
baseUrl = environment.baseUrl;

/*Se define una lista de objetos de tipo Rol*/
vacas: ModelVaca[] = [];

/*Variable para almacenar el id del usuario que se ha logueado para poder utilizarlo
en procesos de auditoria*/
codeUser = '';
/*Variable que almacena el idioma seleccionado del dispositivo, para poder ser utilizado en procesos
de internacionalizacion*/
language = '';


/*Dependencias del servicio
BlockAccess: Dependencia que evita el acceso no autorizado de usuarios no logueados
VacasService: Servicio de los vacas, donde se definen los metodos que se consumen webService
HelperService: Clase utilitaria,
Router: Dependencia para poder redireccionar de un formulario a otro
TranslateService: Servicio para internacionalizacion*/
constructor(private blockAccess: BlockAccessService,
            private vacasService: VacasService,
            public helperService: HelperService,
            private router: Router,
            private translate: TranslateService) { }

/*Metodo que se ejecuta cuando se carga por primera vez el formulario*/
ngOnInit() {

}

/*Metodo que se ejecuta cuando se carga el formulario*/
ionViewWillEnter() {
  // Se obtiene el identidicador del usuario que ingreso al sistema
  this.getProfilePk();
}

getProfilePk() {
  // Se obtiene el identificador del usuario que ingreso al sistema
  this.helperService.getLocalData('profilePk').then(response => {
    this.codeUser = response;
    /*Se carga el leguaje seleccionado*/
    this.getLanguage();
  });
}

getLanguage() {
    // Se obtiene el idioma seleccionado
    this.helperService.getLocalData('language').then(response => {
      this.language = response;
      /*Se llama el metodo que enlista todos los vacas*/
      this.getVacasData();
    });
}



/* Metodo que se encarga de listar todos los vacas del sistema */
getVacasData() {
  /*Se muestra una barra de carga*/
  this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
  /*Se llama al metodo de listar vacas definido en el servicio*/
  this.vacasService.getVacas().subscribe(data => {
    let res: any;
    //console.log(data);
    res = data;
    /*Se convierte en un objeto JSON el listado de datos obtenido*/
    this.vacas = JSON.parse(res.data);
    
    /*Se oculta la barra de carga*/
    this.helperService.ocultarBarraCarga();
  },
  error => {
    this.helperService.ocultarBarraCarga();
    this.helperService.showAlert(this.translate.instant('errorTitulo'), this.translate.instant('errorCargandoInformacion'));
  }
);
}



/*Metodo que se llama cuando se quiera refrescar el listado. Aunque la implementacion es muy similar
al listar vacas, este cambia debido a que no se muestra una barra de carga sino que se muestra la barra
caracteristica del regresco, por lo que su implementacion varia levemente*/
refrescar(event) {
  this.vacasService.getVacas().subscribe(data => {
    let res: any;
    res = data;
    this.vacas = JSON.parse(res.data);
    /*Esta linea oculta la barra de carga caracteristica del refresco*/
    event.target.complete();
  },
  error => {
    event.target.complete();
    this.helperService.showAlert(this.translate.instant('error'), this.translate.instant('errorCargandoInformacion'));
  });
}


/*Metodo que envia los datos de un rol seleccionado en particular a otro formulario,
encapsulando los datos en un NavigationExtras*/
viewVaca(id: string ,numero : string,nombre: string ,idrotacion: string ,sexo: string,raza: string,
         tipoanimal: string,edad: string) {
  /*Se encapsulan los datos en el extra, definiendo un objeto llamado state y su
  variable lo llamamos data*/
   const data: NavigationExtras = {
    state: {
      id,
      numero,
      nombre,
      idrotacion,
      sexo,
      raza,
      tipoanimal,
      edad,
    }
  };

   /*Se redirecciona al formulario vacas-detail, enviando los datos encapsulados en el extra*/
   this.router.navigate(['vacas-detail'], data);
}



}
