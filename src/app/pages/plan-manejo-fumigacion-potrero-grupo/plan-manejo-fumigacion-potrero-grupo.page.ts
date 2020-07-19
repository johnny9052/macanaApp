import { Component, OnInit, Input } from '@angular/core';
import { ModelRotacion } from 'src/app/interfaces/rotacionInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/util/HelperService';
import { RotacionesService } from 'src/app/services/rotaciones.service';

@Component({
  selector: 'app-plan-manejo-fumigacion-potrero-grupo',
  templateUrl: './plan-manejo-fumigacion-potrero-grupo.page.html',
  styleUrls: ['./plan-manejo-fumigacion-potrero-grupo.page.scss'],
})
export class PlanManejoFumigacionPotreroGrupoPage implements OnInit {

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
