import { Component, OnInit, Input } from '@angular/core';
import { ModelPlanManejoFumigacionPotrero } from 'src/app/interfaces/planManejoFumigacionPotreroInterface';
import { ModelPotrero } from 'src/app/interfaces/potrerointerface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/util/HelperService';
import { PotreroService } from 'src/app/services/potrero.service';

@Component({
  selector: 'app-plan-manejo-fumigacion-potrero',
  templateUrl: './plan-manejo-fumigacion-potrero.page.html',
  styleUrls: ['./plan-manejo-fumigacion-potrero.page.scss'],
})
export class PlanManejoFumigacionPotreroPage implements OnInit {
  @Input() id;
  @Input() idplanmanejo;
  @Input() idpotrero;
  @Input() responsable;

  potrero = {} as ModelPlanManejoFumigacionPotrero;

  potreros: ModelPotrero[] = [];

  /*Almacena la configuracion del calendar*/
  customPickerOptions;

  statusTrabajoActual: boolean;

  /*DATOS NECESARIOS PARA REFRESH SELECT*/
  idPotreroTempo;

  constructor(
    private blockAccess: BlockAccessService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public helperService: HelperService,
    public potrerosService: PotreroService
  ) {}

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getPotrero();
  }

  ngOnInit() {
    // Se configura el calendar
    this.customPickerOptions = {
      buttons: [
        {
          text: this.translate.instant("seleccionar"),
          handler: (evento) => {
            this.potrero.fecha =
              evento.year.value +
              "-" +
              evento.month.value +
              "-" +
              evento.day.value;
          },
        },
        {
          text: this.translate.instant("cancelar"),
          handler: (evento) => {
            // console.log('close');
          },
        },
      ],
    };

    // console.log("Ejecutado es " + this.ejecutado);  

    this.potrero.id = this.id;
    this.potrero.idplanfumigacion = this.idplanmanejo;
    this.idPotreroTempo = this.idpotrero;
    this.potrero.idresponsable = this.responsable;
    
    // console.log('El valor es', this.experiencia.currently_working);
  }

  getPotrero() {
    this.potrerosService.getPotrero().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.potreros = JSON.parse(res.data);
        this.potrero.idpotrero = this.idPotreroTempo;
      },
      (error) => {
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
      }
    );
  }


  enviarDatosAlFormulario() {
    // debugger;
    this.modalCtrl.dismiss(this.potrero);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
