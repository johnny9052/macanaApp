import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {


  /* Se recibe el titulo a monstrar desde el llamado del componente */
  @Input() titulo: string;
  /* Se recibe si se desea mostrar un boton de regreso desde el llamado del componente*/
  @Input() botonRegreso: boolean;

  /* Variable ocultar global */
  ocultar = '';


  /* AlertController: Dependencia para mostrar mensajes emergentes con algun tipo de accion */
  constructor( private navCtrl: NavController) { }

  ngOnInit() {}


  /* Metodo para ocultar el banner para que no se genera el error de transicion en IOS*/
  ocultarRegresar() {

    this.ocultar = 'ocultarElemento';

    setTimeout(() => {
      this.navCtrl.navigateBack('/');
    }, 1);

  }

}
