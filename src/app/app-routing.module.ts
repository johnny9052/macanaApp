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
    path: 'cambio-climatico',
    loadChildren: () => import('./pages/cambio-climatico/cambio-climatico.module').then( m => m.CambioClimaticoPageModule)
  },
  {
    path: 'pluviosidad',
    loadChildren: () => import('./pages/pluviosidad/pluviosidad.module').then( m => m.PluviosidadPageModule)
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
    path: 'plan-manejo',
    loadChildren: () => import('./pages/plan-manejo/plan-manejo.module').then( m => m.PlanManejoPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
