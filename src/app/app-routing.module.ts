import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', loadChildren: () => import('./pages/log-in/log-in.module').then( m => m.LogInPageModule)},
  {
    path: 'master-page',
    loadChildren: () => import('./pages/master-page/master-page.module').then( m => m.MasterPagePageModule)
  },
  {
    path: 'potrero',
    loadChildren: () => import('./pages/potrero/potrero.module').then( m => m.PotreroPageModule)
  },
  {
    path: 'aforos',
    loadChildren: () => import('./pages/aforos/aforos.module').then( m => m.AforosPageModule)
  },
  {
    path: 'plaga',
    loadChildren: () => import('./pages/plaga/plaga.module').then( m => m.PlagaPageModule)
  },
  {
    path: 'fertilizacion',
    loadChildren: () => import('./pages/fertilizacion/fertilizacion.module').then( m => m.FertilizacionPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./pages/roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'permisos',
    loadChildren: () => import('./pages/permisos/permisos.module').then( m => m.PermisosPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'analisis',
    loadChildren: () => import('./pages/analisis/analisis.module').then( m => m.AnalisisPageModule)
  },
  {
    path: 'informe',
    loadChildren: () => import('./pages/informe/informe.module').then( m => m.InformePageModule)
  },
  {
    path: 'vacas',
    loadChildren: () => import('./pages/vacas/vacas.module').then( m => m.VacasPageModule)
  },
  {
    path: 'usuarios-detail',
    loadChildren: () => import('./pages/usuarios-detail/usuarios-detail.module').then( m => m.UsuariosDetailPageModule)
  },
  {
    path: 'roles-detail',
    loadChildren: () => import('./pages/roles-detail/roles-detail.module').then( m => m.RolesDetailPageModule)
  },
  {
    path: 'estado-climatologico',
    loadChildren: () => import('./pages/estado-climatologico/estado-climatologico.module').then( m => m.EstadoClimatologicoPageModule)
  },
  {
    path: 'estado-climatologico-detail',
    loadChildren: () => import('./pages/estado-climatologico-detail/estado-climatologico-detail.module').then( m => m.EstadoClimatologicoDetailPageModule)
  },
  {
    path: 'vacas-detail',
    loadChildren: () => import('./pages/vacas-detail/vacas-detail.module').then( m => m.VacasDetailPageModule)
  },
  {
    path: 'rotaciones',
    loadChildren: () => import('./pages/rotaciones/rotaciones.module').then( m => m.RotacionesPageModule)
  },
  {

    path: 'aforo-detail',
    loadChildren: () => import('./pages/aforo-detail/aforo-detail.module').then( m => m.AforoDetailPageModule)
  },
  {
    path: 'rotaciones-detail',
    loadChildren: () => import('./pages/rotaciones-detail/rotaciones-detail.module').then( m => m.RotacionesDetailPageModule)

  },
  {
    path: 'potrero-detail',
    loadChildren: () => import('./pages/potrero-detail/potrero-detail.module').then( m => m.PotreroDetailPageModule)
  },
  {
    path: 'presentacion',
    loadChildren: () => import('./pages/presentacion/presentacion.module').then( m => m.PresentacionPageModule)
  },
  {

    path: 'presentacion-detail',
    loadChildren: () => import('./pages/presentacion-detail/presentacion-detail.module').then( m => m.PresentacionDetailPageModule)
  },
  {
    path: 'raza-vaca',
    loadChildren: () => import('./pages/raza-vaca/raza-vaca.module').then( m => m.RazaVacaPageModule)
  },
  {
    path: 'raza-vaca-detail',
    loadChildren: () => import('./pages/raza-vaca-detail/raza-vaca-detail.module').then( m => m.RazaVacaDetailPageModule)
  },
  {
    path: 'plan-manejo-fertilizacion',
    loadChildren: () => import('./pages/plan-manejo-fertilizacion/plan-manejo-fertilizacion.module').then( m => m.PlanManejoFertilizacionPageModule)
  },
  {
    path: 'plan-manejo-fertilizacion-detail',
    loadChildren: () => import('./pages/plan-manejo-fertilizacion-detail/plan-manejo-fertilizacion-detail.module').then( m => m.PlanManejoFertilizacionDetailPageModule)
  },
  {
    path: 'fertilizante',
    loadChildren: () => import('./pages/fertilizante/fertilizante.module').then( m => m.FertilizantePageModule)
  },
  {
    path: 'fertilizante-detail',
    loadChildren: () => import('./pages/fetilizante-detail/fetilizante-detail.module').then( m => m.FetilizanteDetailPageModule)
  },
  {
    path: 'cronograma',
    loadChildren: () => import('./pages/cronograma/cronograma.module').then( m => m.CronogramaPageModule)
  },
  {
    path: 'plan-manejo-fertilizacion-operario',
    loadChildren: () => import('./pages/plan-manejo-fertilizacion-operario/plan-manejo-fertilizacion-operario.module').then( m => m.PlanManejoFertilizacionOperarioPageModule)
  },
   {
     path: 'cronograma-datail',
     loadChildren: () => import('./pages/cronograma-datail/cronograma-datail.module').then( m => m.CronogramaDatailPageModule)
   },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },  {
    path: 'actividad-detail',
    loadChildren: () => import('./pages/actividad-detail/actividad-detail.module').then( m => m.ActividadDetailPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
