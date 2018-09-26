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
      canActivate: [AuthGuard],
      data : {'tituloModulo':'Inicio'}
      },
      {
      path: 'qaliwarma/catalogo',
      loadChildren: './qaliwarma/catalogo-producto/catalogo-producto.module#CatalogoProductoModule',
      data : {'tituloModulo':'Catalogo Qaliwarma'}
      },
      {
        path: 'qaliwarma/producto-por-numero-entrega',
        loadChildren: './qaliwarma/producto-por-numero-entrega/producto-por-numero-entrega.module#ProductoPorNumeroEntregaModule',
        data : {'tituloModulo':'Producto Por Numero Entrega'}
      },
      {
        path: 'qaliwarma/centros-educativos',
        loadChildren: './qaliwarma/requerimiento-volumen-001/volumen-requerimiento-001.module#VolumenRequerimiento001Module',
        data : {'tituloModulo':'Centros Educativos'}
      },
      {
        path: 'qaliwarma/rutas-distribucion',
        loadChildren: './qaliwarma/ruta-distribucion/ruta-distribucion.module#RutaDistribucionModule',
        data : {'tituloModulo':'Ruta Distribucion'}
      }  ,
      {
        path: 'qaliwarma/guia',
        loadChildren: './qaliwarma/guia-remision/guia-remision.module#GuiaRemisionModule',
        data : {'tituloModulo':'Guia Remision'}
      }   ,
      {
        path: 'qaliwarma/impresion-guia',
        loadChildren: './qaliwarma/guia-remision/guia-remision.module#GuiaRemisionModule',
        data : {'tituloModulo':'Impresion Guias'}
      }   
      ,{
        path : 'qaliwarma/consultas',
        loadChildren : './qaliwarma/consultas/consultas.module#ConsultasModule',
        data : {'tituloModulo':'Consultas'}
      },
      {
        path : 'qaliwarma/procesos',
        loadChildren : './qaliwarma/procesos/procesos.module#ProcesosModule',
        data : {'tituloModulo':'Procesos'}
      },
      {
        path : 'qaliwarma/parametros',
        loadChildren : './qaliwarma/parametros/parametros.module#ParametrosModule',
        data : {'tituloModulo':'Parametros'}
      },      
      // ALMACEN
      {
        path: 'almacen/nota-ingreso',
        loadChildren: './modulo-almacen/almacen-ingreso/almacen-ingreso.module#AlmacenIngresoModule',
        data : {'tituloModulo':'Ingreso Almacen'}
      },

      /* almacen proceso de inicio de operaciones cierre y apertura */
      {
        path: 'almacen/procesos',
        loadChildren: './modulo-almacen/periodoalmacen/periodoalmacen.module#PeriodoalmacenModule'
      },     
      
      
      //COMPRAS
      {
        path: 'compras/registro',
        loadChildren: './modulo-compras/modulo-compras.module#ModuloComprasModule'
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
      {
        path: 'configuracion/perfiles',
        loadChildren: './modulo-sistema-config/perfil/perfil.module#PerfilModule'        

      },
      {
        path: 'configuracion/tipodocumento',
        loadChildren: './modulo-sistema-config/tipodocumento/tipodocumento.module#TipodocumentoModule'        

      },      
      //DOCUMENTACION
      {
        path: 'documentacion',
        loadChildren: './documentacion/documentacion.module#DocumentacionModule'
      }
      //TABLAS
      ,
      {
        path : 'tablas/empleado',
        loadChildren : './modulo-cuenta-rr-hh/empleado/empleado.module#EmpleadoModule'
      },
      {
        path : 'tablas/producto',
        loadChildren : './modulo-sistema-config/tablas/producto/producto.module#ProductoModule'
      },
      {
        path : 'tablas/proveedorcliente',
        loadChildren : './modulo-sistema-config/tablas/proveedorcliente/proveedorcliente.module#ProveedorclienteModule'
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
