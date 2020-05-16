import { Component, OnInit, Input } from '@angular/core';
import { ModelPlanManejoFertilizacionPotrero } from 'src/app/interfaces/planManejoFertilizacionPotreroInterface';
import { ModelPotrero } from 'src/app/interfaces/potrerointerface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/util/HelperService';
import { PotreroService } from 'src/app/services/potrero.service';
import { ModelRotacion } from '../../interfaces/rotacionInterface';
import { RotacionesService } from 'src/app/services/rotaciones.service';

@Component({
  selector: 'app-plan-manejo-fertilizacion-potrero-grupo',
  templateUrl: './plan-manejo-fertilizacion-potrero-grupo.page.html',
  styleUrls: ['./plan-manejo-fertilizacion-potrero-grupo.page.scss'],
})
export class PlanManejoFertilizacionPotreroGrupoPage implements OnInit {
  
  @Input() idplanmanejo;
  @Input() responsable;

  rotaciones: ModelRotacion[] = [];

  rotacionGlobal = {} as ModelRotacion;

  idRotacion;

  constructor(
    private blockAccess: BlockAccessService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    public helperService: HelperService,
    public rotacionesService: RotacionesService
  ) {}

  ionViewWillEnter() {
    // Se obtiene los roles de la base de datos para ser cargados en el select
    this.getRotaciones();
  }

  ngOnInit() {
    
  }

  getRotaciones() {
    // this.helperService.mostrarBarraDeCarga(this.translate.instant('espere'));
    this.rotacionesService.getRotacion().subscribe(
      (data) => {
        let res: any;
        res = data;        
        this.rotaciones = JSON.parse(res.data);

        this.rotacionGlobal.id = "-1";
        this.rotacionGlobal.nombre = "(Todas) Hato la macana";

        this.rotaciones.unshift(this.rotacionGlobal);

      },
      (error) => {
        this.helperService.ocultarBarraCarga();
        this.helperService.showAlert(
          this.translate.instant("errorTitulo"),
          this.translate.instant("errorCargandoInformacion")
        );
      }
    );
  }




  enviarDatosAlFormulario() {
    // debugger;
    this.modalCtrl.dismiss({idplanmanejo:this.idplanmanejo,idrotacion:this.idRotacion,idresponsable:this.responsable});
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
