import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Input() titulo: string;
  @Input() search: boolean;

  constructor(public helperService: HelperService,
              public alertCtrl: AlertController,
              private translate: TranslateService) { }

  ngOnInit() {}

 async logOut() {

    const alert = await this.alertCtrl.create({
      header:  this.translate.instant('desconectarse'),
      message: this.translate.instant('deseaDesconectarse'),
      buttons: [
        {
          text: this.translate.instant('cancelar'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {

          }
        },
        {
          text: this.translate.instant('aceptar'),
          cssClass: 'secondary',
          handler: async blah => {
            this.helperService.removeLocalData('profilePk');
            this.helperService.removeLocalData('firstName');
            this.helperService.removeLocalData('lastName');
            this.helperService.removeLocalData('image_perfil');
            /*Variable utilizada para saber si ya actualizo su informacion de perfil*/
            this.helperService.removeLocalData('profileUser');
            // // console.log('VAMOS A REDIRECCIONAR');
            this.helperService.redireccionar('/');
          }
        }
      ]
    });

    await alert.present();

  }

}
