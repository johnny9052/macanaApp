import { Component, OnInit } from '@angular/core';
import { ModelUserLogIn } from 'src/app/interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss']
})
export class LogInPage implements OnInit {

  /*Se define el modelo del usuario para el logIn*/
  userDataLogIn = {} as ModelUserLogIn;

  /*
  * SecurityService: Servicio del logIn, que contiene los metodos que consumen los webServices
  * HelperService: Dependencia con funcionalizades genericas
  */
  constructor(
    private securityService: SecurityService,
    public helperService: HelperService
  ) {}

  /* Cada vez que se carga el formulario, limpia los campos del logIn
  el objeto*/
  ngOnInit() {
    this.userDataLogIn.username = '';
    this.userDataLogIn.password = '';
  }

  identify() {
    /* Esta linea evita que se muestra el error de definir algo variable que segun
    el IDE es constante. postDataObj es un objeto temporal que encapsula los datos
    que seran enviados al webService. En este el primer campo hace referencia al
    nombre de la variable que llegara al webService, y el segundo campo es el valor
    de dicha variable*/
    // tslint:disable-next-line: prefer-const
    let postDataObj = new FormData();
    postDataObj.append('username' , this.userDataLogIn.username);
    postDataObj.append('password' , this.userDataLogIn.password);
    /*La variable action indica la accion que se va a ejecutar en el webService*/
    postDataObj.append('action' , 'logIn');

    /* Se llama el metodo definido en el webService, mandando por parametro el objeto
    con los datos encapsulados*/
    this.securityService.logInUser(postDataObj);
  }

}
