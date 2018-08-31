import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard } from './shared/guard/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
      path: '',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
      canActivate: [AuthGuard]
      },
      {
      path: 'qaliwarma/catalogo',
      loadChildren: './qaliwarma/catalogo-producto/catalogo-producto.module#CatalogoProductoModule'
      },
      {
        path: 'qaliwarma/producto-por-numero-entrega',
        loadChildren: './qaliwarma/producto-por-numero-entrega/producto-por-numero-entrega.module#ProductoPorNumeroEntregaModule'
      },
      {
        path: 'qaliwarma/centros-educativos',
        loadChildren: './qaliwarma/requerimiento-volumen-001/volumen-requerimiento-001.module#VolumenRequerimiento001Module'
      },
      {
        path: 'qaliwarma/rutas-distribucion',
        loadChildren: './qaliwarma/ruta-distribucion/ruta-distribucion.module#RutaDistribucionModule'
      }  ,
      {
        path: 'qaliwarma/guia',
        loadChildren: './qaliwarma/guia-remision/guia-remision.module#GuiaRemisionModule'
      }   ,
      {
        path: 'qaliwarma/impresion-guia',
        loadChildren: './qaliwarma/guia-remision/guia-remision.module#GuiaRemisionModule'
      }   
      ,{
        path : 'qaliwarma/consultas',
        loadChildren : './qaliwarma/consultas/consultas.module#ConsultasModule'
      },
      {
        path : 'qaliwarma/procesos',
        loadChildren : './qaliwarma/procesos/procesos.module#ProcesosModule'
      },
      {
        path : 'qaliwarma/parametros',
        loadChildren : './qaliwarma/parametros/parametros.module#ParametrosModule'
      },

      {
        path: 'configuracion/perfiles',
        loadChildren: './modulo-sistema-config/perfil/perfil.module#PerfilModule'        

      },
      // almacen
      {
        path: 'almacen/catalogo',
        loadChildren: './modulo-almacen/producto/producto.module#ProductoModule'
      },

      //CONFIGURACION
      {
        path : 'configuracion/menu',
        loadChildren : './modulo-sistema-config/menu/menu.module#MenuModule'
      },
      {
        path : 'configuracion/usuarios',
        loadChildren : './modulo-sistema-config/usuario/usuario.module#UsuarioModule'
      },
      //DOCUMENTACION
      {
        path: 'documentacion',
        loadChildren: './documentacion/documentacion.module#DocumentacionModule'
      }
    ]
  }, 
 

  {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
  }, 
   {
   path: '**',
   redirectTo: 'session/404'
   }
];
