import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent implements OnInit {


  @Input() titulo: string;
  @Input() botonRegreso: boolean;
  @Input() botonIngreso: boolean;

  ocultar = '';

  constructor( private navCtrl: NavController) { }

  ngOnInit() {}


  ocultarRegresar() {

    this.ocultar = 'ocultarElemento';

    setTimeout(() => {
      this.navCtrl.navigateBack('/');
    }, 1);

  }

}
