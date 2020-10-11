import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ModelCronograma } from 'src/app/interfaces/cronogramainterface';
import { CronogramaPage } from '../cronograma/cronograma.page';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
 
  /* Para mostrar el las pendientes y la terminadas por aparte*/ 
  cambioEstado:string = "0";

   /*Se define una lista de objetos de tipo Rol*/
   cronogramas: ModelCronograma[] = [];
  constructor() { }

  ngOnInit() {
    //  CronogramaPage.refrescar();

  }

  public cambioLista(estado:string){
    if (estado == "0"){
      this.cambioEstado = '0';
    }
    if (estado == "1"){
      this.cambioEstado = '1';
    }
  }

 
}
