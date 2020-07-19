import { Component, OnInit, Input } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/util/HelperService';
import { ModelPlanManejoFumigacionInsumoFumigacion } from 'src/app/interfaces/ModelPlanManejoFumigacionInsumoFumigacion';
import { ModelInsumoFumigacion } from 'src/app/interfaces/insumoFumigacioninterface';
import { InsumoFumigacionService } from 'src/app/services/insumo-fumigacion.service';


@Component({
  selector: 'app-plan-manejo-fumigacion-insumo',
  templateUrl: './plan-manejo-fumigacion-insumo.page.html',
  styleUrls: ['./plan-manejo-fumigacion-insumo.page.scss'],
})
export class PlanManejoFumigacionInsumoPage implements OnInit {
  @Input() id;
  @Input() idplanmanejo;
  @Input() idinsumofumigacion;
  @Input() cantidad;
  @Input() responsable;

  insumofumigacion = {} as ModelPlanManejoFumigacionInsumoFumigacion;

  insumosfumigacion: ModelInsumoFumigacion[] = [];

  /*DATOS NECESARIOS PARA REFRESH SELECT*/
  idInsumoFumigacionTempo;

  constructor(
    private blockAccess: BlockAccessService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public helperService: HelperService,
    public insumosfumigacionService: InsumoFumigacionService
  ) {}

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getInsumoFumigacion();
  }

  ngOnInit() {
    
    // console.log("Ejecutado es " + this.ejecutado);  

    this.insumofumigacion.id = this.id;
    this.insumofumigacion.idplanfumigacion = this.idplanmanejo;
    this.idInsumoFumigacionTempo = this.idinsumofumigacion;
    this.insumofumigacion.cantidad = this.cantidad;
    this.insumofumigacion.idresponsable = this.responsable;
  
  }

  getInsumoFumigacion() {
    this.insumosfumigacionService.getInsumoFumigacion().subscribe(
      (data) => {
        let res: any;
        res = data;
        this.insumosfumigacion = JSON.parse(res.data);
        this.insumofumigacion.idinsumofumigacion = this.idInsumoFumigacionTempo;
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
    this.modalCtrl.dismiss(this.insumofumigacion);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }


}
