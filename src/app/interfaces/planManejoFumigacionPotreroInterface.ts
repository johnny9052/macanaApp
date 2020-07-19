/* Modelo del objeto roles*/
export interface ModelPlanManejoFumigacionPotrero {
  id:string;
  idplanfumigacion: string;
  idpotrero: string;
  fecha: string;
  observaciones: string;
  idresponsable: string;
  ejecutado: boolean;
  token:string;

  numero: string;
}
