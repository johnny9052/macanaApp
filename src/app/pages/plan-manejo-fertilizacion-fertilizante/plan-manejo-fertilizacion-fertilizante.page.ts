import { Component, OnInit, Input } from '@angular/core';
import { ModelPlanManejoFertilizacionFertilizante } from 'src/app/interfaces/ModelPlanManejoFertilizacionFertilizante';
import { ModelFertilizante } from 'src/app/interfaces/fertilizanteinterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/util/HelperService';
import { FertilizanteService } from 'src/app/services/fertilizante.service';

@Component({
  selector: 'app-plan-manejo-fertilizacion-fertilizante',
  templateUrl: './plan-manejo-fertilizacion-fertilizante.page.html',
  styleUrls: ['./plan-manejo-fertilizacion-fertilizante.page.scss'],
})
export class PlanManejoFertilizacionFertilizantePage implements OnInit {
  @Input() id;
  @Input() idplanmanejo;
  @Input() idfertilizante;
  @Input() cantidad;
  @Input() responsable;

  fertilizante = {} as ModelPlanManejoFertilizacionFertilizante;

  fertilizantes: ModelFertilizante[] = [];

  /*DATOS NECESARIOS PARA REFRESH SELECT*/
  idFertilizanteTempo;

  constructor(
    private blockAccess: BlockAccessService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public helperService: HelperService,
    public fertilizantesService: FertilizanteService
  ) {}

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getFertilizante();
  }

  ngOnInit() {
    
    // console.log("Ejecutado es " + this.ejecutado);  

    this.fertilizante.id = this.id;
    this.fertilizante.idplanfertilizacion = this.idplanmanejo;
    this.idFertilizanteTempo = this.idfertilizante;
    this.fertilizante.cantidad = this.cantidad;
    this.fertilizante.idresponsable = this.responsable;
  
  }

  getFertilizante() {
    this.fertilizantesService.getFertilizante().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.fertilizantes = JSON.parse(res.data);
        this.fertilizante.idfertilizante = this.idFertilizanteTempo;
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
    this.modalCtrl.dismiss(this.fertilizante);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }


}
