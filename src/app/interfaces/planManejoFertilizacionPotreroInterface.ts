/* Modelo del objeto roles*/
export interface ModelPlanManejoFertilizacionPotrero {
  id:string;
  idplanfertilizacion: string;
  idpotrero: string;
  fecha: string;
  observaciones: string;
  idresponsable: string;
  ejecutado: boolean;
  token:string;

  numero: string;
}
